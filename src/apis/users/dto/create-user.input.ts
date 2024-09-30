import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserInput {
  @IsNotEmpty({ message: '이메일을 입력하세요' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: '이름을 입력하세요' })
  @IsString({ message: '특수문자를 제외한 문자를 입력하세요' })
  name: string;

  @IsNotEmpty({ message: '비밀번호를 입력하세요' })
  @IsString({
    message: '특수문자, 문자, 숫자 포함 8자 이상 15자 이내로 입력하세요',
  })
  @Length(8, 15, {
    message: '비밀번호는 8자리 이상이어야 합니다',
  })
  password?: string;
}

export class LoginUserInput {
  @IsNotEmpty({ message: '이메일을 입력하세요' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: '비밀번호를 입력하세요' })
  @IsString({
    message: '특수문자, 문자, 숫자 포함 8자 이상 15자 이내로 입력하세요',
  })
  @Length(8, 15, {
    message: '비밀번호는 8자리 이상이어야 합니다',
  })
  password: string;
}
