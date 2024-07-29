import express, { Express, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../swagger.json'
import ProductRoutes from './Routes/ProductRoutes'
import PaymentRoutes from './Routes/PaymentRoutes'
import OrderRoutes from './Routes/OrderRoutes'
import CustomerRoutes from './Routes/CustomerRoutes'

const getApiRoute = (name: String) => `/api/${name}`

const app: Express = express()
app.use(express.json())

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
app.use(getApiRoute('docs'), swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(getApiRoute('product'), productRoutes.buildRouter())
app.use(getApiRoute('payment'), paymentRoutes.buildRouter())
app.use(getApiRoute('order'), orderRoutes.buildRouter())
app.use(getApiRoute('customer'), customerRoutes.buildRouter())

export default app
