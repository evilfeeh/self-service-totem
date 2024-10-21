import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { FirstStatement1716215951567 as createTables } from './Migrations/1716215951567-FirstStatement'
import { AddProducts1716250566139 as AddProducts } from './Migrations/1716250566139-AddProducts'
import { Customer } from './Models/Customer'
import { Product } from './Models/Product'
import { Order } from './Models/Order'
import { OrderItem } from './Models/OrderItem'
import { Payment } from './Models/Payment'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
    entities: [Customer, Product, Order, OrderItem, Payment],
    migrations: [createTables, AddProducts],
    synchronize: true,
})

AppDataSource.initialize()
    .then(() => {
        console.log(
            '[MySql Database]: Connection has been established successfully 🚀'
        )
    })
    .catch((error) => {
        throw error
    })
