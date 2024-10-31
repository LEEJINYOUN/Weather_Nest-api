import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '이메일', default: 'string' })
  @IsNotEmpty({ message: '이메일을 입력하세요' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '이름', default: 'string' })
  @IsNotEmpty({ message: '이름을 입력하세요' })
  @IsString({ message: '특수문자를 제외한 문자를 입력하세요' })
  name: string;

  @ApiProperty({ description: '비밀번호', default: 'string' })
  @IsNotEmpty({ message: '비밀번호를 입력하세요' })
  @IsString({
    message: '특수문자, 문자, 숫자 포함 8자 이상 15자 이내로 입력하세요',
  })
  @Length(8, 15, {
    message: '비밀번호는 8자리 이상이어야 합니다',
  })
  password?: string;

  @ApiProperty({ description: '권한', default: 'string' })
  @IsNotEmpty()
  role: string;
}

export class LoginUserDto {
  @ApiProperty({ description: '이메일', default: 'string' })
  @IsNotEmpty({ message: '이메일을 입력하세요' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호', default: 'string' })
  @IsNotEmpty({ message: '비밀번호를 입력하세요' })
  @IsString({
    message: '특수문자, 문자, 숫자 포함 8자 이상 15자 이내로 입력하세요',
  })
  @Length(8, 15, {
    message: '비밀번호는 8자리 이상이어야 합니다',
  })
  password: string;
}
