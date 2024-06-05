import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../../shared/types/controllers.types';
import { ICourseService } from '../types/abstractions';
import { IRequest } from '../../../shared/types/req.types';
import middlewares from '../../users/middlewares';

export default class CourseController implements Controller {
  public path: string = '/courses';
  public router: Router = Router();
  private authMiddlewares = middlewares;

  constructor(private courseServices: ICourseService) {
    this.createCourse = this.createCourse.bind(this);
    this.getAllCourses = this.getAllCourses.bind(this);
    this.enrollCourse = this.enrollCourse.bind(this);
    this.createLesson = this.createLesson.bind(this);
    this.getAllLessons = this.getAllLessons.bind(this);
    this.loadRoutes();
  }

  loadRoutes() {
    this.router.post(`${this.path}`, this.createCourse);
    this.router.get(`${this.path}`, this.getAllCourses);
    this.router.post(
      `${this.path}/enrol`,
      this.authMiddlewares.authenticate,
      this.enrollCourse
    );

    // lessons
    this.router.post(
      `${this.path}/lessons`,
      this.authMiddlewares.authenticate,
      this.createLesson
    );
    this.router.get(
      `${this.path}/lessons`,
      this.authMiddlewares.authenticate,
      this.getAllLessons
    );
  }

  public async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.courseServices.createCourse(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error) {
      next(error);
    }
  }

  public async getAllCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.courseServices.getAllCourses(req.query);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error) {
      next(error);
    }
  }

  public async enrollCourse(req: IRequest, res: Response, next: NextFunction) {
    try {
      const data = await this.courseServices.enrollCourse(req.body, req.user);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error) {
      next(error);
    }
  }

  public async createLesson(req: IRequest, res: Response, next: NextFunction) {
    try {
      const data = await this.courseServices.createLesson(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error) {
      next(error);
    }
  }

  public async getAllLessons(req: IRequest, res: Response, next: NextFunction) {
    try {
      const data = await this.courseServices.getAllLessons(req.query);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error) {
      next(error);
    }
  }
}
