import "reflect-metadata"
import { DataSource } from "typeorm";
import { Customer } from "./models/Customer";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'MfDZk"rTtn[f>j%',
  database: 'self-attendence',
  logging: false,
  entities: [Customer],
})

AppDataSource.initialize().then(() => {}).catch((error) => console.log(error));