import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt.guard';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('유저 API')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 모든 유저 조회
  @Get('all')
  @ApiOperation({
    summary: '모든 유저 조회',
    description: '모든 유저 리스트를 조회합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '유저 리스트 조회에 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '유저 리스트 조회에 실패하였습니다.',
  })
  getAllUser(): Promise<User[]> {
    return this.usersService.getAllUser();
  }

  // 특정 유저 조회
  @Get(':id')
  @ApiOperation({
    summary: '특정 유저 조회',
    description: '특정 유저를 조회합니다.',
  })
  @ApiResponse({ status: 201, description: '특정 유저 조회에 성공하였습니다.' })
  @ApiResponse({ status: 404, description: '특정 유저 조회에 실패하였습니다.' })
  @ApiParam({ name: 'id', required: true, description: '유저 id' })
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  // 회원가입
  @Post('register')
  @ApiOperation({
    summary: '회원가입',
    description: '회원가입을 합니다.',
  })
  @ApiResponse({ status: 201, description: '회원가입을 성공하였습니다' })
  @ApiResponse({ status: 404, description: '회원가입을 실패하였습니다' })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.register(createUserDto);
  }

  // 로그인
  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: '로그인을 합니다.',
  })
  @ApiResponse({ status: 201, description: '로그인을 성공하였습니다' })
  @ApiResponse({ status: 404, description: '로그인을 실패하였습니다' })
  async login(
    @Body() loginUserInput: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<object> {
    return await this.usersService.login(loginUserInput, response);
  }

  // 유저 정보 가져오기
  @Post('getUser')
  @ApiOperation({
    summary: '유저 정보 조회',
    description: '로그인한 유저 정보를 조회합니다.',
  })
  @ApiBody({
    schema: {
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: '유저 정보 조회에 성공하였습니다' })
  @ApiResponse({ status: 404, description: '유저 정보 조회에 실패하였습니다' })
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() request: Request): Promise<object> {
    return await this.usersService.getUser(request);
  }

  // 로그아웃
  @Post('logout')
  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃을 합니다.',
  })
  @ApiResponse({ status: 201, description: '로그아웃을 성공하였습니다' })
  @ApiResponse({ status: 404, description: '로그아웃을 실패하였습니다' })
  logout(@Res() response: Response): Promise<any> {
    return this.usersService.logout(response);
  }
}
