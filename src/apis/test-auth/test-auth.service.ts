import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

import { TestAuthRegisterDto } from './dto/create-test-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { TestAuthRepository } from './test-auth.repository';

@Injectable()
export class TestAuthService {
  constructor(
    @InjectRepository(TestAuthRepository)
    private readonly testAuthRepository: TestAuthRepository,
    private readonly jwtService: JwtService, //
  ) {}

  // 회원가입
  async register(testAuthRegisterDto: TestAuthRegisterDto): Promise<void> {
    return this.testAuthRepository.createUser(testAuthRegisterDto);
  }

  // 로그인
  async login(
    testAuthRegisterDto: TestAuthRegisterDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = testAuthRegisterDto;
    const user = await this.testAuthRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 토큰 생성 후 반환
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('로그인 실패..');
    }
  }
}
