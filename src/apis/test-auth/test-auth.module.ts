import { Module } from '@nestjs/common';
import { TestAuthController } from './test-auth.controller';
import { TestAuthService } from './test-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAuth } from './entities/test-auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TestAuth, //
    ]),
  ],
  controllers: [TestAuthController],
  providers: [TestAuthService],
})
export class TestAuthModule {}
