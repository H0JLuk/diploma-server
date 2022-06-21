import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserRole } from 'src/auth/user-role.enum';
import { TestEntity } from 'src/test/entities';

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

  // @Field()
  @Column({ type: 'text' })
  password: string;

  @Field({ defaultValue: UserRole.Student })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.Student })
  role: UserRole;

  @Field(() => [TestEntity])
  @OneToMany(() => TestEntity, (test) => test.creator)
  createdTests: TestEntity[];
}
