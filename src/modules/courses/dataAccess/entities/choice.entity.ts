import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity('choices')
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  choiceText: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.choices)
  question: Question;
}
