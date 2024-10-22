import { DataSource, Repository } from 'typeorm';
import { TestBoard } from './entities/test-board.entity';
import { Injectable } from '@nestjs/common';
import { TestAuth } from '../test-auth/entities/test-auth.entity';
import { CreateTestBoardDto } from './dto/create-test-board.dto';
import { TestBoardStatus } from './entities/common/enums';

@Injectable()
export class TestBoardRepository extends Repository<TestBoard> {
  async createBoard(
    createTestBoardDto: CreateTestBoardDto,
    testAuth: TestAuth,
  ): Promise<TestBoard> {
    const { title, description } = createTestBoardDto;

    const board = this.create({
      title,
      description,
      status: TestBoardStatus.PUBLIC,
      testAuth,
    });

    await this.save(board);

    return board;
  }
  constructor(dataSource: DataSource) {
    super(TestBoard, dataSource.createEntityManager());
  }
}
