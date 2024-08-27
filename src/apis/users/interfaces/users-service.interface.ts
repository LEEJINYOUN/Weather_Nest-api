export interface IUsersServiceRegister {
  email: string;
  name: string;
  password?: string;
  hashedPassword?: string;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUsersServiceLogin {
  email: string;
  password: string;
}
