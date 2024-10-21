import { IsNotEmpty } from 'class-validator';
import { TestBoardStatus } from '../entities/common/enums';

export class CreateTestBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  status: TestBoardStatus;
}
