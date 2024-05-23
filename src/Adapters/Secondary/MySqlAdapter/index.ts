import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Customer } from './models/Customer'
import { OrderItem } from './models/OrderItem'
import { Order } from './models/Order'
import { Product } from './models/Product'
import { FirstStatement1716215951567 as FirstStatement } from './migrations/1716215951567-FirstStatement'
import { AddProducts1716250566139 as AddProducts } from './migrations/1716250566139-AddProducts'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
    entities: [Customer, Product, Order, OrderItem],
    migrations: [FirstStatement, AddProducts],
    synchronize: false,
})

AppDataSource.initialize()
    .then(() => {
        console.log('Connection has been established successfully')
    })
    .catch((error) => {
        throw error
    })
