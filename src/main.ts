import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 유효성 파이프 검증
  app.enableCors({
    // cors 설정
    origin: [], // 프론트 주소 추가
    credentials: true, // 쿠키를 사용할 수 있게 해당 값을 true로 설정
  });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
