import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TestBoardsService } from './test-boards.service';
import { TestBoard } from './entities/test-board.entity';
import { CreateTestBoardDto } from './dto/create-test-board.dto';
import { TestBoardStatus } from './entities/common/enums';
import { TestBoardStatusValidationPipe } from './pipes/test-board-status-validation.pipe';

@Controller('testBoards')
export class TestBoardsController {
  constructor(private readonly testBoardsService: TestBoardsService) {}

  // 모든 게시물 조회
  @Get('/')
  getAllBoard(): Promise<TestBoard[]> {
    return this.testBoardsService.getAllBoards();
  }

  // 게시물 생성
  @Post('/create')
  // UsePipes -> 파이프 사용
  // ValidationPipe -> 유효성 체크
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createTestBoardDto: CreateTestBoardDto,
  ): Promise<TestBoard> {
    return this.testBoardsService.createBoard({ createTestBoardDto });
  }

  // 특정 게시물 조회
  @Get(':id')
  // ParseIntPipe -> 숫자가 아닌 경우 에러
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<TestBoard> {
    return this.testBoardsService.getBoardById(id);
  }

  // 특정 게시물 삭제
  @Delete(':id')
  async deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.testBoardsService.deleteBoard(id);
  }

  // 특정 게시물 상태 업데이트
  @Patch(':id/status')
  // TestBoardStatusValidationPipe -> 커스텀 파이프
  async updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TestBoardStatusValidationPipe) status: TestBoardStatus,
  ): Promise<TestBoard> {
    return this.testBoardsService.updateBoardStatus(id, status);
  }
}
