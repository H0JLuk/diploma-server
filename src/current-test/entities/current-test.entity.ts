import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from 'src/users/entities';
import { TestEntity } from 'src/test/entities';
import { AnswerEntity } from 'src/answer/entities';

@ObjectType()
@Entity('Current_history')
export class CurrentTestEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'start_time' })
  startTime: Date;

  @Field(() => [UserEntity])
  @ManyToOne(() => UserEntity, (user) => user.currentTests)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @Field(() => [TestEntity])
  @ManyToOne(() => TestEntity, (test) => test.histories)
  @JoinColumn({ name: 'test_id' })
  test: TestEntity;
  @Column({ type: 'int', name: 'test_id' })
  testId: number;

  @Field(() => [AnswerEntity])
  @ManyToMany(() => AnswerEntity, { cascade: true })
  @JoinTable({
    name: 'current_answer',
    joinColumn: {
      name: 'Current_history',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'Answer',
      referencedColumnName: 'id',
    },
  })
  answers: TestEntity[];
}
