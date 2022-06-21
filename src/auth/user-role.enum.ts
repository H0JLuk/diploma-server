import { GraphQLEnumType } from 'graphql';

export enum UserRole {
  Student = 'Student',
  Methodist = 'Methodist',
  Admin = 'Admin',
}

export const GqlUserRole = new GraphQLEnumType({
  // TODO: add valid enum
  name: 'UserRole',
  values: {
    [UserRole.Admin]: { value: UserRole.Admin },
    [UserRole.Methodist]: { value: UserRole.Methodist },
    [UserRole.Student]: { value: UserRole.Student },
  },
});
