import express, { Express, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../../swagger.json'
import HeathController from './Controllers/HealthController'
import CustomerController from './Controllers/CustomerController'
import CustomerService from '../../../Application/services/CustomerService'
import ICustomerRepository from '../../../Application/Ports/Secondary/ICustomerRepository'
import CustomerRepository from '../../../Adapters/Secondary/MySqlAdapter/Repositories/CustomerRepository'
import IProductRepository from '../../../Application/Ports/Secondary/IProductRepository'
import ProductService from '../../../Application/services/ProductService'
import ProductController from './Controllers/ProductController'
import ProductRepository from '../../Secondary/MySqlAdapter/Repositories/ProductRepository'
import IOrderRepository from '../../../Application/Ports/Secondary/IOrderRepository'
import OrderRepository from '../../Secondary/MySqlAdapter/Repositories/OrderRepository'
import OrderService from '../../../Application/services/OrderService'
import OrderController from './Controllers/OrderController'
import IPaymentService from '../../../Application/Ports/Primary/IPaymentService'
import { PaymentService } from '../../../Application/services/PaymentService'
import PaymentController from './Controllers/PaymentController'
import IPaymentRepository from '../../../Application/Ports/Secondary/IPaymentRepository'
import PaymentRepository from '../../Secondary/MySqlAdapter/Repositories/PaymentRepository'

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

const orderRepository: IOrderRepository = new OrderRepository()
const orderService = new OrderService(
    orderRepository,
    customerRepository,
    productRepository
)
const orderController = new OrderController(orderService)

const paymentRepository: IPaymentRepository = new PaymentRepository()
const paymentService: IPaymentService = new PaymentService(paymentRepository)
const paymentController = new PaymentController(paymentService)

app.use(getApiRoute('docs'), swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(getApiRoute('health'), heathController.buildRouter())
app.use(getApiRoute('customer'), customerController.buildRouter())
app.use(getApiRoute('product'), productController.buildRouter())
app.use(getApiRoute('order'), orderController.buildRouter())
app.use(getApiRoute('payment'), paymentController.buildRouter())

export default app
