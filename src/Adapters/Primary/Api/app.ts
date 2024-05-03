import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./Routes";

dotenv.config();

const app: Express = express();
app.use(express.json());

app.use('/api', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is up and running at http://localhost:${port} 🚀`);
});