import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { TestAuth } from './entities/test-auth.entity';
import { Repository } from 'typeorm';
import { TestAuthRegisterDto } from './dto/create-test-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TestAuthService {
  constructor(
    @InjectRepository(TestAuth)
    private readonly testAuthRepository: Repository<TestAuth>,
    private readonly jwtService: JwtService, //
  ) {}

  // 회원가입
  async register(testAuthRegisterDto: TestAuthRegisterDto): Promise<any> {
    try {
      const { username, password } = testAuthRegisterDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.testAuthRepository.save({
        username,
        password: hashedPassword,
      });

      return user;
    } catch (e) {
      if ((e.code = '23505')) {
        throw new ConflictException('유저이름이 존재합니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
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
