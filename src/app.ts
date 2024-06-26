import 'module-alias';
import express, { Application, Request, Response } from 'express';
import 'colors';
import morgan from 'morgan';
import Controller from './shared/types/controllers.types';
import { errorHandler } from './shared/middlewares/error.middleware';
import cors from 'cors';

class App {
  app: Application;
  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initControllers(controllers);
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach(async (controller: Controller) => {
      this.app.use('/api/v1', controller.router);
    });
  }
  private initializeMiddlewares() {
    const corsOptions = {
      origin: '*',
    };
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(errorHandler);
  }
}

export default App;
