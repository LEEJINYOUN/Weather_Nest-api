import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { TestAuthService } from './test-auth.service';
import { TestAuthRegisterDto } from './dto/create-test-auth.dto';

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
}
