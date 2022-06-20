import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AnswerEntity } from 'src/answer/entities';
import { TestEntity } from 'src/test/entities';

@ObjectType()
@Entity('Question')
export class QuestionEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ unique: true })
  text: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'text' })
  image: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 'single' })
  type: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text_answer: string;

  @Field(() => [AnswerEntity], { nullable: true }) // TODO: disable nullable field
  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];

  @Field(() => [TestEntity], { nullable: true })
  @ManyToMany(() => TestEntity, (test) => test.questions, { cascade: true })
  @JoinTable({
    name: 'test_question',
    joinColumn: {
      name: 'question_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'test_id',
      referencedColumnName: 'id',
    },
  })
  tests: TestEntity[];
}
