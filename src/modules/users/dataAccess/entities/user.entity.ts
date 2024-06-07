import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Course } from '../../../courses/dataAccess/entities/course.entity';
import { Quiz } from '../../../courses/dataAccess/entities/quiz.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Course, (course) => course.users)
  @JoinTable()
  courses: Course[];

  @ManyToMany(() => Quiz, (quiz) => quiz.users)
  @JoinTable()
  quizes: Quiz[];

  @CreateDateColumn()
  createdAt: Date;
}
