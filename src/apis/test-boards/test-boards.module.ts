import { Module } from '@nestjs/common';
import { TestBoardsController } from './test-boards.controller';
import { TestBoardsService } from './test-boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestBoard } from './entities/test-board.entity';
import { TestAuthModule } from '../test-auth/test-auth.module';
import { TestBoardRepository } from './test-board.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TestBoard, //
    ]),
    TestAuthModule, //
  ],
  controllers: [TestBoardsController],
  providers: [TestBoardsService, TestBoardRepository],
})
export class TestBoardsModule {}
