import { Request, Response, Router } from "express";

export default class HeathController {
    constructor() {}

    buildRouter(): Router {
    const router = Router();
    router.get("/", this.getServerHealth.bind(this));
    return router;
    }

    getServerHealth(req: Request, res: Response): void {
        res.status(200).json('Olá 6SOAT - TS!');
    }
}
