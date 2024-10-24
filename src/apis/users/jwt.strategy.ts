import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';

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

    // 만료기간
    const expire = exp * 1000;

    if (id && email) {
      // 1. 토큰이 유효할 경우
      if (Date.now() < expire) {
        return { id, email };
      }

      // 2. payload에 정보는 잘 있으나 토큰 만료
      throw new HttpException('토큰 만료', HttpStatus.UNAUTHORIZED);
    } else {
      // 3. payload에 정보가 없음
      throw new HttpException('접근 오류', HttpStatus.FORBIDDEN);
    }
  }
}
