import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TestAuthService } from './test-auth.service';
import { TestAuthRegisterDto } from './dto/create-test-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { TestAuth } from './entities/test-auth.entity';

@Controller('testAuth')
export class TestAuthController {
  constructor(private readonly testAuthService: TestAuthService) {}

  // 회원가입
  @Post('register')
  async register(
    @Body(ValidationPipe) testAuthRegisterDto: TestAuthRegisterDto,
  ): Promise<void> {
    return this.testAuthService.register(testAuthRegisterDto);
  }

  // 로그인
  @Post('login')
  async login(
    @Body(ValidationPipe) testAuthRegisterDto: TestAuthRegisterDto,
  ): Promise<{ accessToken: string }> {
    return this.testAuthService.login(testAuthRegisterDto);
  }

  // 로그인 테스트
  @Post('authTest')
  @UseGuards(AuthGuard()) // 인증 미들웨어
  authTest(@GetUser() user: TestAuth) {
    console.log(user);
  }
}
