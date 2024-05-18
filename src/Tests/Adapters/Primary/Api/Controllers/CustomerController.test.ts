import { Request, Response, Router } from 'express';
import CustomerController from '../../../../../Adapters/Primary/Api/Controllers/CustomerController';
import ICustomerService from '../../../../../Application/Ports/Primary/ICustomerService';

describe('CustomerController', () => {
  let controller: CustomerController;
  let mockCustomerService: jest.Mocked<ICustomerService>;
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    mockCustomerService = {} as jest.Mocked<ICustomerService>;
    controller = new CustomerController(mockCustomerService);
    req = {};
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      setHeader: jest.fn(),
    } as any;
  });

  describe('buildRouter', () => {
    it('should return a router with register and identify endpoints', () => {
      const router = controller.buildRouter();
      expect(router).toBeDefined();
      expect(router.stack.length).toBe(2); // Assuming two routes are defined
      const route1 = router.stack[0];
      const route2 = router.stack[1];
      expect(route1.route.path).toBe('/');
      expect(route1.route.methods.post).toBeTruthy();
      expect(route2.route.path).toBe('/identify');
      expect(route2.route.methods.post).toBeTruthy();
    });
  });
});
