import {
  ConflictException,
  Injectable,
  UnauthorizedException,
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

    delete saveUser.password;

    // 주소 생성
    await this.addressService.createAddress({
      saveUser,
    });

    return saveUser;
  }

  // 토큰 발급
  getAccessToken({ user }: IUserServiceGetAccessToken): string {
    const accessToken = this.jwtService.sign({ id: user.id });

    return accessToken;
  }

  // 로그인
  async login({ email, password, response }: IUserServiceLogin): Promise<any> {
    // 이메일 체크
    const user = await this.checkEmail({ email });

    // 일치하는 유저가 없는 경우
    if (!user)
      throw new UnprocessableEntityException('등록된 이메일이 없습니다.');

    // 비밀번호가 다른 경우
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException(
        '비밀번호가 맞지 않습니다. 다시 확인해 주세요.',
      );

    // 4. 로그인 성공한 경우
    const jwt = this.getAccessToken({ user });
    response.cookie('jwt', jwt, { httpOnly: true });

    const loginData = {
      statusCode: 201,
      token: jwt,
    };

    return loginData;
  }

  // 토큰 정보 가져오기
  async user(request: any): Promise<any> {
    try {
      const token = request.body.token;

      // jwt 정보 가져오기
      const data = await this.jwtService.verifyAsync(token);

      if (!data) {
        throw new UnauthorizedException();
      }

      // 유저 정보 찾기
      const user = await this.usersRepository.findOne({
        where: { id: data.id },
      });

      // 비밀번호를 제외한 정보 가져오기
      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  // 로그아웃
  logout() {
    const result = {
      message: '로그아웃 성공',
      statusCode: 201,
    };
    return result;
  }
}
