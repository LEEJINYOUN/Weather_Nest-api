import { Module } from '@nestjs/common';
import { TestAuthController } from './test-auth.controller';
import { TestAuthService } from './test-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAuth } from './entities/test-auth.entity';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TestAuthRepository } from './test-auth.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TestAuth, //
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TestAuthController],
  providers: [
    TestAuthService, //
    TestAuthRepository, //
    JwtStrategy,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class TestAuthModule {}
