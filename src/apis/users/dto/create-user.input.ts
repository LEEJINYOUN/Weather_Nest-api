export class CreateUserInput {
  email: string;
  name: string;
  password?: string;
}

export class LoginUserInput {
  email: string;
  password: string;
}
