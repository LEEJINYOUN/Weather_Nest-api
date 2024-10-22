import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestBoard } from './entities/test-board.entity';
import { TestBoardStatus } from './entities/common/enums';
import { TestAuth } from '../test-auth/entities/test-auth.entity';
import { TestBoardRepository } from './test-board.repository';
import { CreateTestBoardDto } from './dto/create-test-board.dto';

@Injectable()
export class TestBoardsService {
  constructor(
    @InjectRepository(TestBoardRepository)
    private testBoardsRepository: TestBoardRepository,
  ) {}

  // 모든 게시물 조회
  async getAllBoards(): Promise<any> {
    return this.testBoardsRepository.find();
  }

  // 게시물 생성
  createBoard(
    createTestBoardDto: CreateTestBoardDto,
    testAuth: TestAuth,
  ): Promise<TestBoard> {
    return this.testBoardsRepository.createBoard(createTestBoardDto, testAuth);
  }

  // 특정 게시물 조회
  async getBoardById(id: number): Promise<TestBoard> {
    const found = await this.testBoardsRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`${id} 게시물을 찾을 수 없습니다.`);
    }
    return found;
  }

  // 특정 게시물 삭제
  async deleteBoard(id: number, testAuth: TestAuth): Promise<any> {
    const result = await this.testBoardsRepository.delete({ id, testAuth });

    if (result.affected === 0) {
      throw new NotFoundException(`${id}번 게시물을 찾을 수 없습니다.`);
    }
    return;
  }

  // 특정 게시물 상태 업데이트
  async updateBoardStatus(
    id: number,
    status: TestBoardStatus,
  ): Promise<TestBoard> {
    const found = await this.getBoardById(id);

    const board = {
      ...found,
      status,
    };

    return await this.testBoardsRepository.save(board);
  }
}
