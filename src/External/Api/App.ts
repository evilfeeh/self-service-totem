import express, { Express, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../swagger.json'
import ProductRoutes from './Routes/ProductRoutes'
import PaymentRoutes from './Routes/PaymentRoutes'
import OrderRoutes from './Routes/OrderRoutes'
import CustomerRoutes from './Routes/CustomerRoutes'
import VerifyAuthToken from '../../UseCases/Auth/verifyAuthToken.usecase'
import { authMiddleware } from './Auth/AuthMiddleware'

const getApiRoute = (name: String) => `/api/${name}`

const app: Express = express()
app.use(express.json())

const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'

const verifyAuthToken = new VerifyAuthToken(jwtSecret)

const productRoutes = new ProductRoutes()
const paymentRoutes = new PaymentRoutes()
const orderRoutes = new OrderRoutes()
const customerRoutes = new CustomerRoutes()

app.use(
    getApiRoute('docs'),
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: { url: `${process.env.SWAGGER_URL}` },
    })
)
app.use('/api', authMiddleware(verifyAuthToken))
app.use(getApiRoute('docs'), swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(getApiRoute('product'), productRoutes.buildRouter())
app.use(getApiRoute('payment'), paymentRoutes.buildRouter())
app.use(getApiRoute('order'), orderRoutes.buildRouter())
app.use(getApiRoute('customer'), customerRoutes.buildRouter())

export default app
