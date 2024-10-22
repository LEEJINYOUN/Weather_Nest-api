import { User } from '../entities/user.entity';

export interface IUsersServiceLogin {
  email: string;
  password: string;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUserServiceGetAccessToken {
  user: User;
}
