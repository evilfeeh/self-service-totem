import express, { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../swagger.json'
import ProductRoutes from './Routes/ProductRoutes'
import PaymentRoutes from './Routes/PaymentRoutes'
import OrderRoutes from './Routes/OrderRoutes'
import CustomerRoutes from './Routes/CustomerRoutes'
import VerifyAuthToken from '../../UseCases/Auth/verifyAuthToken.usecase'
import { authMiddleware } from './Auth/AuthMiddleware'
import { RouteTypeEnum } from '../../Entities/Enums/RouteType'

const getApiRoute = (name: String) => `/api/${name}`

const app: Express = express()
app.use(express.json())

const jwtSecret = process.env.JWT_SECRET || ''

const verifyAuthToken = new VerifyAuthToken(jwtSecret)

const productRoutes = new ProductRoutes()
const paymentRoutes = new PaymentRoutes()
const orderRoutes = new OrderRoutes()
const customerRoutes = new CustomerRoutes()

app.use('/api', authMiddleware(verifyAuthToken))

app.use(
    `/${RouteTypeEnum.PUBLIC}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: { url: `${process.env.SWAGGER_URL}` },
    })
)
app.use(getApiRoute('product'), productRoutes.buildRouter())
app.use(getApiRoute('payment'), paymentRoutes.buildRouter())
app.use(getApiRoute('order'), orderRoutes.buildRouter())

export default app
