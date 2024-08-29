import { Response } from 'express';
import { User } from '../entities/user.entity';

export interface IUsersServiceRegister {
  email: string;
  name: string;
  password?: string;
  hashedPassword?: string;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUserServiceLogin {
  email: string;
  password: string;
  response: Response;
}

export interface IUserServiceGetAccessToken {
  user: User;
}
