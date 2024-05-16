import { Repository } from "typeorm"
import IOrderRepository from "../../../../Application/Ports/Secondary/IOrderRepository"
import Order from "../../../../Application/domain/Entities/Order"
import { Either } from "../../../../Shared/util/either"
import { Order as model } from '../models/Order'
import { Customer as CustomerModel } from '../models/Customer'
import { OrderItem as OrderItemModel } from '../models/OrderItem'
import { Product as ProductModel } from '../models/Product'
import { AppDataSource } from "../index"
import Customer from "../../../../Application/domain/Entities/Customer"

export default class OrderRepository implements IOrderRepository {
  private repository: Repository<model>
  private repositoryCustomer: Repository<CustomerModel>
  private repositoryProduct: Repository<ProductModel>
  
  constructor() {
    this.repository = AppDataSource.getRepository(model)
    this.repositoryCustomer = AppDataSource.getRepository(CustomerModel)
    this.repositoryProduct = AppDataSource.getRepository(ProductModel)
  }

  async create(order: Order): Promise<Either<Error, string>> {
    try {
      const customer = order.getCustomer();
      const orderModel = new model();

      if (customer instanceof Customer) { 
        const customerFind = await this.repositoryCustomer.findOneBy({
          cpf: customer.getCpf()
        })

        if (customerFind) {
          orderModel.customer = customerFind
        }
      } else if (typeof customer === 'string') {
        orderModel.nameCustomer = customer
      }

      const orderItems = order.getItems();
      for (let index = 0; index < orderItems.length; index++) {
        const item = orderItems[index];        
        const productModel = await this.repositoryProduct.
        productModel.name = item.getProduct().getName()
        productModel.
        const orderItemModel = new OrderItemModel();
        orderItemModel.product = item.getProduct();
        orderItemModel.quantity = item.getQuantity(),
        orderItemModel.total = item.getTotalValue(),
        orderItemModel.order = orderModel
      }
            
      orderModel.items = order.getItems().map(item => ({
        product: item.getProduct(),
        quantity: item.getQuantity(),
        total: item.getTotalValue(),
        order: orderModel
      }))

      
      await this.repository.save(customerModel)

      return Right<string>(customer.getCpf())
  } catch (error) {
      return Left<Error>(error as Error)
  }
  }
  async update(order: Order): Promise<Either<Error, string>> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<Either<Error, string>> {
    throw new Error("Method not implemented.");
  }

}