import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { TestAuth } from './entities/test-auth.entity';
import { Repository } from 'typeorm';
import { TestAuthRegisterDto } from './dto/create-test-auth.dto';

@Injectable()
export class TestAuthService {
  constructor(
    @InjectRepository(TestAuth)
    private readonly testAuthRepository: Repository<TestAuth>,
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
}
