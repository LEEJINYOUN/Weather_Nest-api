import { TestAuth } from 'src/apis/test-auth/entities/test-auth.entity';
import { CreateTestBoardDto } from '../dto/create-test-board.dto';
import { TestBoardStatus } from '../entities/common/enums';

export interface ITestBoardsServiceDto {
  createTestBoardDto: CreateTestBoardDto;
  user: TestAuth;
}

export interface ITestBoardsServiceUpdate {
  id: number;
  status: TestBoardStatus;
}
