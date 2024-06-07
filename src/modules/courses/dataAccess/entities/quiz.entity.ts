import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  Column,
  ManyToMany,
} from 'typeorm';
import { Lesson } from './lesson.entity';
import { Question } from './question.entity';
import { User } from '../../../users/dataAccess/entities/user.entity';
// import { Question } from './Question';

@Entity('quizes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Lesson, (lesson) => lesson.quiz)
  lesson: Lesson;

  @Column({ nullable: true })
  score: number;

  @ManyToMany(() => User, (user) => user.quizes)
  users: User[];

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
