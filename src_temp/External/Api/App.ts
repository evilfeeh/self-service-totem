import express, { Express, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../swagger.json'
import ProductRoutes from './Routes/ProductRoutes'
import OrderRoutes from './Routes/OrderRoutes'

const getApiRoute = (name: String) => `/api/${name}`

const app: Express = express()
app.use(express.json())

const productRoutes = new ProductRoutes()
const orderRoutes = new OrderRoutes()

app.use(getApiRoute('docs'), swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(getApiRoute('product'), productRoutes.buildRouter())
app.use(getApiRoute('order'), orderRoutes.buildRouter())

export default app
