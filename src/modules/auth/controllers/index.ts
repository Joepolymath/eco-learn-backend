import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../../shared/types/controllers.types';
import { IAuthService } from '../types/abstractions';

export default class AuthController implements Controller {
  path: string = '/auth';
  router: Router = Router();

  constructor(private authService: IAuthService) {
    this.login = this.login.bind(this);
    this.loadRoutes();
  }

  loadRoutes() {
    this.router.post(`${this.path}/login`, this.login);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.authService.login(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error) {
      next(error);
    }
  }
}
