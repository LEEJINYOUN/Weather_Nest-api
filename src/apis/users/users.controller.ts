import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginUserInput, RegisterUserInput } from './dto/create-user.input';
import { Request, Response } from 'express';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 모든 유저 조회
  @Get('users')
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  // 회원가입
  @Post('register')
  async register(@Body() createUserInput: RegisterUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    return this.usersService.register({
      email: createUserInput.email,
      name: createUserInput.name,
      password: hashedPassword,
    });
  }

  // 로그인
  @Post('login')
  async login(
    @Body() loginUserInput: LoginUserInput,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return this.usersService.login({
      email: loginUserInput.email,
      password: loginUserInput.password,
      response,
    });
  }

  // 유저 정보 가져오기
  @Post('getUser')
  async user(
    @Req() request: Request, //
  ) {
    return this.usersService.getUser(request);
  }

  // 로그아웃
  @Post('logout')
  async logout() {
    return this.usersService.logout();
  }
}
