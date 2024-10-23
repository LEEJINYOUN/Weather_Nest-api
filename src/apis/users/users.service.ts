import {
  ConflictException,
  Injectable,
  NotFoundException,
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
  IUsersServiceCreateUser,
  IUsersServiceFindOneByEmail,
} from './interfaces/users-service.interface';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService, //
  ) {}

  // 모든 유저 조회
  getAllUser(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // 특정 유저 조회
  async getUserById(id: number): Promise<User> {
    // 1. 쿼리 설정
    const query = this.usersRepository.createQueryBuilder('user');

    // 2. 쿼리로 조회
    query.where('user.id =:id', { id });

    const user = await query.getOne();

    delete user.password;

    return user;
  }

  // 이메일 체크
  checkEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  // 회원가입
  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, name, password } = createUserDto;

    // 1. 이메일 체크
    const isEmail = await this.checkEmail(email);

    // 2. 일치하는 이메일이 있는 경우
    if (isEmail)
      throw new ConflictException({
        objectOrError: '이메일 오류',
        descriptionOrOptions:
          '이미 등록된 이메일입니다. 입력한 이메일을 확인하고 다시 시도하세요.',
      });

    // 3. 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. 회원가입 하기
    const saveUser = await this.usersRepository.save({
      email,
      name,
      password: hashedPassword,
    });

    delete saveUser.password;

    return saveUser;
  }

  // 로그인
  async login(loginUserInput: LoginUserDto, response: any): Promise<any> {
    const { email, password } = loginUserInput;

    // 1. 이메일 체크
    const user = await this.checkEmail(email);

    // 2. 일치하는 유저 X
    if (!user)
      throw new UnprocessableEntityException({
        objectOrError: '이메일 오류',
        descriptionOrOptions:
          '등록된 이메일이 없습니다. 입력한 이메일을 확인하고 다시 시도하세요.',
      });

    // 3. 일치하는 유저 O, 비밀번호 X
    const isPasswordMatches = await bcrypt.compare(password, user.password);
    if (!isPasswordMatches)
      throw new UnprocessableEntityException({
        objectOrError: '비밀번호 오류',
        descriptionOrOptions:
          '입력한 비밀번호가 올바르지 않습니다. 입력한 비밀번호를 확인하고 다시 시도하세요.',
      });

    // 4. 일치하는 유저 O, 비밀번호 O
    // 4.1 토큰 발행
    const jwt = this.jwtService.sign({ id: user.id });

    // 4.2 쿠키에 저장
    response.cookie('jwt', jwt, { httpOnly: true });

    const loginData = {
      statusCode: 201,
      token: jwt,
    };

    return loginData;
  }

  // 유저 정보 가져오기
  async getUser(request: any): Promise<any> {
    try {
      const token = request.body.token;

      // 1. jwt 토큰 정보 가져오기
      const data = await this.jwtService.verifyAsync(token);

      if (!data) {
        throw new UnauthorizedException();
      }

      // 2. 유저 정보 찾기
      const user = await this.usersRepository.findOne({
        where: { id: data.id },
      });

      // 3. 비밀번호를 제외한 정보 가져오기
      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  // 로그아웃
  logout(response: any): Promise<any> {
    try {
      // 1. 쿠키 삭제
      response.cookie('jwt', '', {
        maxAge: 0,
      });

      return response.send({
        message: '로그아웃 성공',
        statusCode: 201,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
