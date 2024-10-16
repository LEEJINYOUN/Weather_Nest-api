import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 모든 유저 조회
  @Get('all')
  getAllUser(): Promise<User[]> {
    return this.usersService.getAllUser();
  }

  // 특정 유저 조회
  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  // 회원가입
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersService.register({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    });
  }

  // 로그인
  @Post('login')
  async login(
    @Body() loginUserInput: LoginUserDto,
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
  async getUser(
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
