import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Lesson } from './lesson.entity';
import { Question } from './question.entity';
// import { Question } from './Question';

@Entity('quizes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Lesson, (lesson) => lesson.quiz)
  lesson: Lesson;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
