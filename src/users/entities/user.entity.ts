import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserRole } from 'src/auth/user-role.enum';
import { TestEntity } from 'src/test/entities';
import { TestHistoryEntity } from 'src/test-history/entities/test-history.entity';
import { CurrentTestEntity } from 'src/current-test/entities/current-test.entity';

@ObjectType()
@Entity('User')
export class UserEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field()
  @Column({ unique: true })
  login: string;

  @Column({ type: 'text' })
  password: string;

  @Field({ defaultValue: UserRole.Student })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.Student })
  role: UserRole;

  @Field(() => [TestEntity])
  @OneToMany(() => TestEntity, (test) => test.creator)
  createdTests: TestEntity[];

  @Field(() => [TestHistoryEntity])
  @OneToMany(() => TestHistoryEntity, (testHistory) => testHistory.user)
  testsHistory: TestHistoryEntity[];

  @Field(() => [CurrentTestEntity])
  @OneToMany(() => CurrentTestEntity, (currentTest) => currentTest.user)
  currentTests: CurrentTestEntity[];
}
