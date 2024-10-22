import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TestAuth } from './entities/test-auth.entity';
import { TestAuthRegisterDto } from './dto/create-test-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestAuthRepository extends Repository<TestAuth> {
  async createUser(testAuthRegisterDto: TestAuthRegisterDto): Promise<void> {
    try {
      const { username, password } = testAuthRegisterDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.create({ username, password: hashedPassword });
      await this.save(user);
    } catch (e) {
      if ((e.code = '23505')) {
        throw new ConflictException('유저이름이 존재합니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  constructor(dataSource: DataSource) {
    super(TestAuth, dataSource.createEntityManager());
  }
}
