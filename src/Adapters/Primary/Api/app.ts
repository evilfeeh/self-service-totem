import express, { Express, Request, Response } from 'express'
import HeathController from './Controllers/HealthController'
import CustomerController from './Controllers/CustomerController'
import CustomerService from '../../../Application/services/CustomerService'
import ICustomerRepository from '../../../Application/Ports/Secondary/ICustomerRepository'
import CustomerRepository from '../../../Adapters/Secondary/MySqlAdapter/Repositories/CustomerRepository'

const getApiRoute = (name: String) => `/api/${name}`

const app: Express = express()
app.use(express.json())

const heathController = new HeathController()

const customerRepository: ICustomerRepository = new CustomerRepository()
const customerService = new CustomerService(customerRepository)
const customerController = new CustomerController(customerService)

app.use(getApiRoute('health'), heathController.buildRouter())
app.use(getApiRoute('customer'), customerController.buildRouter())

export default app
