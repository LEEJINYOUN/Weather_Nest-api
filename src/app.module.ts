import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './apis/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BookmarksModule } from './apis/bookmarks/bookmarks.module';
import { JwtModule } from '@nestjs/jwt';
import { ClothesModule } from './apis/clothes/clothes.module';
import { LocationsModule } from './apis/locations/locations.module';
import { CountriesModule } from './apis/countries/countries.module';

@Module({
  imports: [
    UsersModule, //
    BookmarksModule, //
    ClothesModule, //
    CountriesModule, //
    LocationsModule, //
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
    JwtModule.registerAsync({
      imports: [],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
      }),
      global: true,
      inject: [],
    }), // jwt 설정
  ],
})
export class AppModule {}
