import { Request, Response } from 'express';
import HeathController from '../../../../../Adapters/Primary/Api/Controllers/HealthController';

describe('HeathController', () => {
  let controller: HeathController;
  let req: Partial<Request>;
  let res: Partial<Record<string, any>>;

  beforeEach(() => {
    controller = new HeathController();
    req = {};
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  describe('getServerHealth', () => {
    it('should return server health message', () => {
      controller.getServerHealth(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('Olá 6SOAT - TS!');
    });
  });

  describe('buildRouter', () => {
    it('should return a router with a health endpoint', () => {
      const router = controller.buildRouter();
      expect(router).toBeDefined();
      expect(router.stack.length).toBe(1);
      const route = router.stack[0];
      expect(route.route.path).toBe('/');
      expect(route.route.methods.get).toBeTruthy();
    });
  });
});