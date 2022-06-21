import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AnswerEntity } from 'src/answer/entities';
import { TestEntity } from 'src/test/entities';
import { CategoryEntity } from 'src/category/entities';

@ObjectType()
@Entity('Question')
export class QuestionEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'text' })
  image: string;

  @Field({ nullable: true, defaultValue: 'single' })
  @Column({ nullable: true, default: 'single' })
  type: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text_answer: string;

  @Field(() => [AnswerEntity]) // TODO: disable nullable field
  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];

  @Field(() => [TestEntity])
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

  @Field(() => [CategoryEntity])
  @ManyToMany(() => CategoryEntity, (category) => category.questions, {
    cascade: true,
  })
  @JoinTable({
    name: 'category_question',
    joinColumn: {
      name: 'question_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: CategoryEntity[];
}
