import { Router } from 'express';

const routes = Router();

routes.get('/health', (req, res) => {
  res.send('Olá 6SOAT - TS!');
});


export default routes;
