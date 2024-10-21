import { CreateTestBoardDto } from '../dto/create-test-board.dto';
import { TestBoardStatus } from '../entities/common/enums';

export interface ITestBoardsServiceDto {
  createTestBoardDto: CreateTestBoardDto;
}

export interface ITestBoardsServiceUpdate {
  id: number;
  status: TestBoardStatus;
}
