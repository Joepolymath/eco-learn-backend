import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../../shared/types/controllers.types';
import { IUserService } from '../types/abstractions';
import UserServices from '../services';
import { any } from 'bluebird';

export default class UserController implements Controller {
  public path: string = '/users';
  public router: Router = Router();
  private methods: any[] = [];

  constructor(private userService: IUserService) {
    console.log({ userService });
    this.signUp = this.signUp.bind(this);
    this.mountMethods();
    this.loadRoutes();
  }

  loadRoutes() {
    this.router.post(`${this.path}`, this.signUp);
  }

  mountMethods() {
    this.methods = [this.signUp];
    for (let method of this.methods) {
      method = method.bind(this);
    }
  }

  public async signUp(req: Request, res: Response, next: NextFunction) {
    //  console.log({ service: this.userService });
    try {
      const data = await this.userService.signUp(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error) {
      next(error);
    }
  }
}
