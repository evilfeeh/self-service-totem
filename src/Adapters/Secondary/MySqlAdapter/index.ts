import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Customer } from './models/Customer'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'mcdonalds',
    password: 'MfDZk"rTtn[f>j%',
    database: 'self-attendence',
    logging: false,
    entities: [Customer],
})

AppDataSource.initialize()
    .then(() => {
        console.log('Connection has been established successfully')
    })
    .catch((error) => console.log(error))
