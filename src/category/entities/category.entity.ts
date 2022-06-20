import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { QuestionEntity } from 'src/question/entities';

@ObjectType()
@Entity('Category')
export class CategoryEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToMany(() => QuestionEntity, (question) => question.categories)
  @Field(() => [QuestionEntity], { nullable: true })
  questions: QuestionEntity[];
}
