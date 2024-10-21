import { TestBoardStatus } from '../entities/common/enums';

export interface ITestBoardsServiceDto {
  title: string;
  description: string;
}

export interface ITestBoardsServiceUpdate {
  id: number;
  status: TestBoardStatus;
}
