import { Module } from '@nestjs/common';
import { TestBoardsController } from './test-boards.controller';
import { TestBoardsService } from './test-boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestBoard } from './entities/test-board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TestBoard, //
    ]),
  ],
  controllers: [TestBoardsController],
  providers: [TestBoardsService],
})
export class TestBoardsModule {}
