import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  IUserServiceGetAccessToken,
  IUserServiceLogin,
  IUsersServiceFindOneByEmail,
  IUsersServiceRegister,
} from './interfaces/users-service.interface';
import { AddressService } from '../address/address.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly addressService: AddressService,
    private readonly jwtService: JwtService, //
  ) {}

  // 이메일 체크
  checkEmail({ email }: IUsersServiceFindOneByEmail) {
    return this.usersRepository.findOne({ where: { email } });
  }

  // 회원가입
  async register({
    email,
    name,
    password,
  }: IUsersServiceRegister): Promise<any> {
    // 이메일 체크
    const isEmail = await this.checkEmail({ email });

    // 일치하는 이메일이 있는 경우
    if (isEmail) throw new ConflictException('이미 등록된 이메일입니다.');

    // 회원가입
    const saveUser = await this.usersRepository.save({
      email,
      name,
      password,
    });

    // 주소 생성
    await this.addressService.createAddress({
      saveUser,
    });

    return saveUser;
  }

  // 로그인
  async login({ email, password }: IUserServiceLogin): Promise<string> {
    // 이메일 체크
    const user = await this.checkEmail({ email });

    // 일치하는 유저가 없는 경우
    if (!user)
      throw new UnprocessableEntityException('등록된 이메일이 없습니다.');

    // 비밀번호가 다른 경우
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. 로그인 성공한 경우
    return this.getAccessToken({ user });
  }

  // 토큰 발급
  getAccessToken({ user }: IUserServiceGetAccessToken): string {
    const accessToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '1h' },
    );

    return accessToken;
  }
}
