import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './apis/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, //
    ConfigModule.forRoot(), // env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'], // entity 불러오기 (한번에 불러오기)
      synchronize: true, // entity 동기화
      logging: true, // debug 하고 싶을 때
    }),
  ],
})
export class AppModule {}
