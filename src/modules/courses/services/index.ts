import { IDataRepo } from '../../../shared/types/abstractions/data';
import { ICourse, IEnrollCourse, IGetCourses } from '../types';
import HttpException from '../../../shared/utils/exceptions/http.exceptions';
import responseUtils, { IResponse } from '../../../shared/utils/response.utils';
import { Repository } from 'typeorm';
import { Course } from '../dataAccess/entities/course.entity';
import {
  choiceRepository,
  courseRepository,
  lessonRepository,
  questionRepository,
  quizRepository,
} from '../dataAccess/repositories';
import { Lesson } from '../dataAccess/entities/lesson.entity';
import { Quiz } from '../dataAccess/entities/quiz.entity';
import { Question } from '../dataAccess/entities/question.entity';
import { Choice } from '../dataAccess/entities/choice.entity';
import { ICourseService } from '../types/abstractions';
import { User } from '../../users/dataAccess/entities/user.entity';
import { userRepository } from '../../users/dataAccess/repositories';

class CourseServices implements ICourseService {
  constructor(
    private courseRepo: Repository<Course> = courseRepository,
    private lessonRepo: Repository<Lesson> = lessonRepository,
    private quizRepo: Repository<Quiz> = quizRepository,
    private questionRepo: Repository<Question> = questionRepository,
    private choiceRepo: Repository<Choice> = choiceRepository,
    private userRepo: Repository<User> = userRepository
  ) {}

  public async createCourse(payload: ICourse) {
    const foundCourse = await this.courseRepo.findOne({
      where: [{ title: payload.title }],
    });

    if (foundCourse) {
      return new HttpException(400, 'Course Already Exists');
    }

    const newCourse = await this.courseRepo.create(payload);
    const savedCourse = await this.courseRepo.save(newCourse);

    return responseUtils.buildResponse({
      data: savedCourse,
      message: 'Course Created',
    });
  }

  public async getAllCourses(query: IGetCourses): Promise<IResponse> {
    const paginationData = {
      skip: query.skip || 0,
      limit: query.limit || 0,
    };
    delete query.limit;
    delete query.skip;
    const dbQuery = { ...query };
    const foundCourses = await this.courseRepo.find({
      relations: ['users'],
      where: dbQuery,
      order: { createdAt: 'DESC' },
    });
    const coursesCount = await this.courseRepo.count({ where: dbQuery });

    return responseUtils.buildResponse({
      data: foundCourses,
      count: coursesCount,
      message: 'Courses Retrieved',
    });
  }

  public async enrollCourse(
    payload: IEnrollCourse,
    user: User
  ): Promise<IResponse> {
    const foundCourse = await this.courseRepo.findOne({
      where: { id: payload.id },
    });
    if (!foundCourse) {
      return new HttpException(404, 'Course not found');
    }
    const foundUser = await this.userRepo.findOne({ where: { id: user.id } });
    if (!foundUser) {
      return new HttpException(404, 'User not found');
    }

    // if (foundCourse.users) {
    //   foundCourse.users.push(user);
    // } else {
    //   foundCourse.users = [user];
    // }

    const updatedCourse = await this.courseRepo.save(foundCourse);
    if (foundUser.courses) {
      foundUser.courses.push(updatedCourse);
    } else {
      foundUser.courses = [updatedCourse];
    }
    await this.userRepo.save(foundUser);
    return responseUtils.buildResponse({
      data: updatedCourse,
      message: 'Enrolment Successful',
    });
  }
}

export default CourseServices;
