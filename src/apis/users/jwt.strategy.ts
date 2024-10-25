import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './interfaces/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: true,
    });
  }

  async validate(payload: Payload & { exp: number }) {
    const { id, email, exp } = payload;

    // 1. 만료기간 설정
    const expire = exp * 1000;

    // 2.1 payload에 정보가 있는 경우
    if (id && email) {
      // 3.1 토큰 유효
      if (Date.now() < expire) {
        return { id, email };
      }

      // 3.2 토큰 만료
      throw new HttpException('토큰 만료', HttpStatus.UNAUTHORIZED);
    } else {
      // 2.2 payload에 정보가 없는 경우
      throw new HttpException('접근 오류', HttpStatus.FORBIDDEN);
    }
  }
}
