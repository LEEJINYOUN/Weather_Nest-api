import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TestAuth } from './entities/test-auth.entity';

// 커스텀 데코레이터 생성
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): TestAuth => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
