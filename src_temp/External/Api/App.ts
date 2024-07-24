import express, { Express, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../swagger.json'
import ProductRoutes from './Routes/ProductRoutes'
import PaymentRoutes from './Routes/PaymentRoutes'

const getApiRoute = (name: String) => `/api/${name}`

const app: Express = express()
app.use(express.json())

const productRoutes = new ProductRoutes()
const paymentRoutes = new PaymentRoutes()

app.use(getApiRoute('docs'), swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(getApiRoute('product'), productRoutes.buildRouter())
app.use(getApiRoute('payment'), paymentRoutes.buildRouter())

export default app
