import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { QuestionEntity } from 'src/question/entities';
import { UserEntity } from 'src/users/entities'

@ObjectType()
@Entity('Test')
export class TestEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true, name: 'start_time' })
  @Column({ nullable: true, name: 'start_time' })
  startTime: Date;

  @Field({ nullable: true, name: 'end_time' })
  @Column({ nullable: true, name: 'end_time' })
  endTime: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'int' })
  duration: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  type: string;

  @ManyToMany(() => QuestionEntity, (question) => question.tests)
  @Field(() => [QuestionEntity], { nullable: true })
  questions: QuestionEntity[];

  @Field(() => [UserEntity], { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.createdTests)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @Column({ type: 'int', name: 'creator_id', nullable: true })
  creatorId: number;
}
