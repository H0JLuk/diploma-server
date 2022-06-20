import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { QuestionEntity } from 'src/question/entities';

@ObjectType()
@Entity('Answer')
export class AnswerEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'text' })
  image: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  isRight: boolean;

  @Field(() => [QuestionEntity])
  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;

  @Column({ type: 'int', name: 'question_id' })
  questionId: number;
}
