import express, { Express, Request, Response } from "express";
import HeathController from "./Controllers/HealthController";
import CustomerController from "./Controllers/CustomerController";
import CustomerRepositoryInMemory from "../../Secondary/DataInMemory/Repositories/CustomerRepositoryInMemory";

const getApiRoute = (name: String) => `/api/${name}`;

const app: Express = express();
app.use(express.json());

const heathController = new HeathController();

const customerRepository = new CustomerRepositoryInMemory();
const customerController = new CustomerController(customerRepository);

app.use(getApiRoute('health'), heathController.buildRouter());
app.use(getApiRoute('customer'), customerController.buildRouter());

export default app;