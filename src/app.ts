import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Olá 6SOAT - TS!");
});

app.listen(port, () => {
  console.log(`[server]: Server is up and running at http://localhost:${port} 🚀`);
});