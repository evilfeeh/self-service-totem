import express, { Express, Request, Response } from 'express'
import HeathController from './Controllers/HealthController'
import CustomerController from './Controllers/CustomerController'
import CustomerService from '../../../Application/services/CustomerService'
import ICustomerRepository from '../../../Application/Ports/Secondary/ICustomerRepository'
import CustomerRepository from '../../../Adapters/Secondary/MySqlAdapter/Repositories/CustomerRepository'
import IProductRepository from '../../../Application/Ports/Secondary/IProductRepository'
import ProductService from '../../../Application/services/ProductService'
import ProductController from './Controllers/ProductController'
import ProductRepository from '../../Secondary/MySqlAdapter/Repositories/ProductRepository'

const getApiRoute = (name: String) => `/api/${name}`

const app: Express = express()
app.use(express.json())

const heathController = new HeathController()

const customerRepository: ICustomerRepository = new CustomerRepository()
const customerService = new CustomerService(customerRepository)
const customerController = new CustomerController(customerService)

const productRepository: IProductRepository = new ProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)

app.use(getApiRoute('health'), heathController.buildRouter())
app.use(getApiRoute('customer'), customerController.buildRouter())
app.use(getApiRoute('product'), productController.buildRouter())
export default app
