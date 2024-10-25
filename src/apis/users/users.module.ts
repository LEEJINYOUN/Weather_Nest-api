import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService, //
    JwtStrategy, //
  ],
  exports: [
    JwtStrategy, //
    PassportModule, //
    UsersService, //
  ],
})
export class UsersModule {}
