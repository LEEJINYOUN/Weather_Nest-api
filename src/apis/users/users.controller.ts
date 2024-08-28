import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserInput, LoginUserInput } from './dto/create-user.input';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 회원가입
  @Post('register')
  async register(@Body() createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    return this.usersService.register({
      email: createUserInput.email,
      name: createUserInput.name,
      password: hashedPassword,
    });
  }

  // 로그인
  @Post('login')
  async login(@Body() loginUserInput: LoginUserInput): Promise<string> {
    return this.usersService.login({
      email: loginUserInput.email,
      password: loginUserInput.password,
    });
  }
}
