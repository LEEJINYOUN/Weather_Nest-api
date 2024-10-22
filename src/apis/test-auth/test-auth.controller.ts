import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TestAuthService } from './test-auth.service';
import { TestAuthRegisterDto } from './dto/create-test-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('testAuth')
export class TestAuthController {
  constructor(private readonly testAuthService: TestAuthService) {}

  // 회원가입
  @Post('register')
  async register(
    @Body(ValidationPipe) testAuthRegisterDto: TestAuthRegisterDto,
  ): Promise<any> {
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
  authTest(@Req() req) {
    console.log(req);
  }
}
