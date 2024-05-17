import { In, Repository } from 'typeorm'
import IOrderRepository from '../../../../Application/Ports/Secondary/IOrderRepository'
import Order from '../../../../Application/domain/Entities/Order'
import { Either, Left, Right } from '../../../../Shared/util/either'
import { Order as model } from '../models/Order'
import { Customer as CustomerModel } from '../models/Customer'
import { OrderItem as OrderItemModel } from '../models/OrderItem'
import { Product as ProductModel } from '../models/Product'
import { AppDataSource } from '../index'
import Customer from '../../../../Application/domain/Entities/Customer'
import OrderItem from '../../../../Application/domain/Entities/OrderItem'
import Product from '../../../../Application/domain/Entities/Product'

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

            if (customer instanceof Customer) {
                const customerFind = await this.repositoryCustomer.findOneBy({
                    cpf: customer.getCpf(),
                })

                if (customerFind) {
                    orderModel.customer = customerFind
                }
            } else if (typeof customer === 'string') {
                orderModel.nameCustomer = customer
            }

            const orderItems = order.getItems()
            const productIds = orderItems.map((item) => item.toJson().id)
            const productModels = await this.repositoryProduct.find({
                where: { id: In(productIds) },
            })

            for (const item of orderItems) {
                const productModel = productModels.find(
                    (product) => product.id === item.toJson().id
                )

                const orderItemModel = new OrderItemModel()

                orderItemModel.product = productModel as ProductModel
                orderItemModel.quantity = item.toJson().quantity
                orderItemModel.order = orderModel

                orderModel.orderItems.push(orderItemModel)
            }

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

                // Delete existing order items
                await this.repositoryOrderItem.delete({ order: orderToUpdate })

                const customer = order.getCustomer()
                if (customer instanceof Customer) {
                    const customerFind =
                        await this.repositoryCustomer.findOneBy({
                            cpf: customer.getCpf(),
                        })

                    if (customerFind) {
                        orderToUpdate.customer = customerFind
                    }
                } else if (typeof customer === 'string') {
                    orderToUpdate.nameCustomer = customer
                }

                const orderItems = order.getItems()
                const productIds = orderItems.map((item) => item.toJson().id)
                const productModels = await this.repositoryProduct.find({
                    where: { id: In(productIds) },
                })

                for (const item of orderItems) {
                    const productModel = productModels.find(
                        (product) => product.id === item.toJson().id
                    )

                    const orderItemModel = new OrderItemModel()

                    orderItemModel.product = productModel as ProductModel
                    orderItemModel.quantity = item.toJson().quantity
                    orderItemModel.order = orderToUpdate

                    orderToUpdate.orderItems.push(orderItemModel)
                }

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

            const order = new Order(customer ?? customerName, orderFind.id)

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
                    order.id
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
}
