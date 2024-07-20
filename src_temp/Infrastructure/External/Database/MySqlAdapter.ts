import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { AddProducts1716250566139 as AddProducts } from './Migrations/1716250566139-AddProducts'
import { Customer } from '../../Models/Customer'
import { Product } from '../../Models/Product'
import { Order } from '../../Models/Order'
import { OrderItem } from '../../Models/OrderItem'
import { Payment } from '../../Models/Payment'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
    entities: [Customer, Product, Order, OrderItem, Payment],
    migrations: [AddProducts],
    synchronize: true,
})

AppDataSource.initialize()
    .then(() => {
        console.log('Connection has been established successfully')
    })
    .catch((error) => {
        throw error
    })
