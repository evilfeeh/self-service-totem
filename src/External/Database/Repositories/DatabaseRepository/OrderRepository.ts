import { In, Repository } from 'typeorm'
import { AppDataSource } from '../../MySqlAdapter'
import { Either, Right, Left } from '../../../../@Shared/Either'
import { StatusEnum } from '../../../../Entities/Enums/StatusEnum'
import { Order as model } from '../../Models/Order'
import { Customer as CustomerModel } from '../../Models/Customer'
import { OrderItem as OrderItemModel } from '../../Models/OrderItem'
import { Product as ProductModel } from '../../Models/Product'
import IOrderRepository from '../Contracts/IOrderRepository'
import Order from '../../../../Entities/Order'
import Customer from '../../../../Entities/Customer'
import Product from '../../../../Entities/Product'
import OrderItem from '../../../../Entities/OrderItem'

export default class OrderRepository implements IOrderRepository {
    private repository: Repository<model>
    private repositoryCustomer: Repository<CustomerModel>
    private repositoryProduct: Repository<ProductModel>
    private repositoryOrderItem: Repository<OrderItemModel>

    constructor() {
        this.repository = AppDataSource.getRepository(model)
        this.repositoryCustomer = AppDataSource.getRepository(CustomerModel)
        this.repositoryProduct = AppDataSource.getRepository(ProductModel)
        this.repositoryOrderItem = AppDataSource.getRepository(OrderItemModel)
    }

    async create(order: Order): Promise<Either<Error, string>> {
        try {
            const customer = order.getCustomer()
            const orderModel = new model()
            orderModel.orderItems = []

            if (customer instanceof Customer) {
                const customerFind = await this.repositoryCustomer.findOneBy({
                    cpf: customer.getCpf(),
                })

                if (customerFind) {
                    orderModel.customer = customerFind
                    orderModel.nameCustomer = customerFind.name
                }
            } else if (typeof customer === 'string') {
                orderModel.nameCustomer = customer
            }

            const orderItems = order.getItems()
            const productIds = orderItems.map((item) =>
                item.getProduct().getId()
            )
            const productModels = await this.repositoryProduct.find({
                where: { id: In(productIds) },
            })

            for (const item of orderItems) {
                const productModel = productModels.find(
                    (product) => product.id === item.getProduct().getId()
                )

                const orderItemModel = new OrderItemModel()

                orderItemModel.product = productModel as ProductModel
                orderItemModel.quantity = item.toJson().quantity
                orderItemModel.order = orderModel

                orderModel.orderItems.push(orderItemModel)
            }

            orderModel.status = order.getStatus()
            orderModel.createdAt = order.getCreatedAt()

            const orderSaved = await this.repository.save(orderModel)

            return Right<string>(orderSaved.id)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async update(order: Order): Promise<Either<Error, string>> {
        try {
            const orderJSON = order.toJSON()

            if (orderJSON.id) {
                const orderToUpdate = await this.repository.findOneBy({
                    id: orderJSON.id,
                })

                if (!orderToUpdate) {
                    return Left<Error>(new Error('Order not found'))
                }

                orderToUpdate.orderItems = []
                orderToUpdate.status = orderJSON.status

                const customer = order.getCustomer()
                if (customer instanceof Customer) {
                    const customerFind =
                        await this.repositoryCustomer.findOneBy({
                            cpf: customer.getCpf(),
                        })

                    if (customerFind) {
                        orderToUpdate.customer = customerFind
                        orderToUpdate.nameCustomer = customerFind.name
                    }
                } else if (typeof customer === 'string') {
                    orderToUpdate.nameCustomer = customer
                }

                const orderItems = order.getItems()
                const productIds = orderItems.map((item) =>
                    item.getProduct().getId()
                )
                const productModels = await this.repositoryProduct.find({
                    where: { id: In(productIds) },
                })

                for (const item of orderItems) {
                    const productModel = productModels.find(
                        (product) => product.id === item.getProduct().getId()
                    )

                    const orderItemModel = new OrderItemModel()

                    orderItemModel.product = productModel as ProductModel
                    orderItemModel.quantity = item.toJson().quantity
                    orderItemModel.order = orderToUpdate

                    orderToUpdate.orderItems.push(orderItemModel)
                }

                // Delete existing order items
                await this.repositoryOrderItem.delete({ order: orderToUpdate })

                const orderSaved = await this.repository.save(orderToUpdate)

                return Right<string>(orderSaved.id)
            } else {
                return Left<Error>(new Error('Order not found'))
            }
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
    async delete(id: string): Promise<Either<Error, string>> {
        try {
            await this.repository.delete(id)
            return Right<string>('Order has been removed')
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async get(id: string): Promise<Either<Error, Order>> {
        try {
            const orderFind = await this.repository.findOne({
                where: {
                    id,
                },
                relations: ['customer', 'orderItems', 'orderItems.product'],
            })

            if (!orderFind) {
                return Left<Error>(new Error('Order not found'))
            }

            let customer: Customer | null = null

            if (orderFind.customer) {
                customer = new Customer(
                    orderFind.customer.name,
                    orderFind.customer.cpf,
                    orderFind.customer.email,
                    orderFind.customer.id
                )
            }

            const customerName = orderFind.nameCustomer

            const order = new Order(
                customer ?? customerName,
                orderFind.id,
                orderFind.status,
                orderFind.createdAt
            )

            for (const item of orderFind.orderItems) {
                const product: Product = new Product(
                    item.product.id,
                    item.product.name,
                    item.product.category,
                    item.product.price,
                    item.product.description
                )

                const orderItem = new OrderItem(product, item.quantity, item.id)
                order.addItem(orderItem)
            }

            return Right<Order>(order)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
    async getAll(): Promise<Either<Error, Order[]>> {
        try {
            const ordersFind = await this.repository.find({
                relations: ['customer', 'orderItems', 'orderItems.product'],
            })

            if (!ordersFind) {
                return Left<Error>(new Error('Orders not found'))
            }

            const orders = ordersFind.map((order) => {
                let customer: Customer | null = null

                if (order.customer) {
                    customer = new Customer(
                        order.customer.name,
                        order.customer.cpf,
                        order.customer.email,
                        order.customer.id
                    )
                }

                const customerName = order.nameCustomer

                const orderEntity = new Order(
                    customer ?? customerName,
                    order.id,
                    order.status,
                    order.createdAt
                )

                for (const item of order.orderItems) {
                    const product: Product = new Product(
                        item.product.id,
                        item.product.name,
                        item.product.category,
                        item.product.price,
                        item.product.description
                    )

                    const orderItem = new OrderItem(
                        product,
                        item.quantity,
                        item.id
                    )
                    orderEntity.addItem(orderItem)
                }

                return orderEntity
            })

            return Right<Order[]>(orders)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
    async list(): Promise<Either<Error, Order[]>> {
        try {
            const ordersFind = await this.repository.find({
                relations: ['customer', 'orderItems', 'orderItems.product'],
            })

            if (!ordersFind) {
                return Left<Error>(new Error('Orders not found'))
            }

            const orders = ordersFind.map((order) => {
                let customer: Customer | null = null

                if (order.customer) {
                    customer = new Customer(
                        order.customer.name,
                        order.customer.cpf,
                        order.customer.email,
                        order.customer.id
                    )
                }

                const customerName = order.nameCustomer

                const orderEntity = new Order(
                    customer ?? customerName,
                    order.id,
                    order.status,
                    order.createdAt
                )

                for (const item of order.orderItems) {
                    const product: Product = new Product(
                        item.product.id,
                        item.product.name,
                        item.product.category,
                        item.product.price,
                        item.product.description
                    )

                    const orderItem = new OrderItem(
                        product,
                        item.quantity,
                        item.id
                    )
                    orderEntity.addItem(orderItem)
                }

                return orderEntity
            })

            orders.sort(
                (a, b) =>
                    a.getCreatedAt().getTime() - b.getCreatedAt().getTime()
            )

            const readyOrders = orders.filter(
                (order) => order.getStatus() === StatusEnum.Ready
            )
            const preparingOrders = orders.filter(
                (order) => order.getStatus() === StatusEnum.Preparing
            )
            const receivedOrders = orders.filter(
                (order) => order.getStatus() === StatusEnum.Received
            )

            return Right<Order[]>({
                ...readyOrders,
                ...preparingOrders,
                ...receivedOrders,
            })
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
}
