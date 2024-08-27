import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IUsersServiceFindOneByEmail,
  IUsersServiceLogin,
  IUsersServiceRegister,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // 이메일 체크
  findOneByEmail({ email }: IUsersServiceFindOneByEmail) {
    return this.usersRepository.findOne({ where: { email } });
  }

  // 회원가입
  async register({
    email,
    name,
    password,
  }: IUsersServiceRegister): Promise<User> {
    // 등록된 이메일 체크
    const user = await this.findOneByEmail({ email });

    // 일치하는 유저가 있는 경우
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    // 회원가입 성공
    return this.usersRepository.save({
      email,
      name,
      password,
    });
  }

  // 로그인
  async login({ email, password }: IUsersServiceLogin): Promise<string> {
    // 등록된 이메일 체크
    const user = await this.findOneByEmail({ email });

    // 일치하는 유저가 없는 경우
    if (!user)
      throw new UnprocessableEntityException('등록된 이메일이 없습니다.');

    // 비밀번호가 다른 경우
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. 로그인 성공한 경우
    return '로그인 성공';
  }
}
