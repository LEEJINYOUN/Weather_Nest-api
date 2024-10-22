import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestBoard } from './entities/test-board.entity';
import { TestBoardStatus } from './entities/common/enums';
import { ITestBoardsServiceDto } from './interfaces/testBoards-service.interface';
import { TestAuth } from '../test-auth/entities/test-auth.entity';

@Injectable()
export class TestBoardsService {
  constructor(
    @InjectRepository(TestBoard)
    private readonly testBoardsRepository: Repository<TestBoard>,
  ) {}

  // 모든 게시물 조회
  async getAllBoards(user: TestAuth): Promise<TestBoard[]> {
    // const query = this.testBoardsRepository.createQueryBuilder('testBoard');
    // query.where('testBoard.userId = :userId', { userId: user.id });

    // const boards = await query.getMany();
    return this.testBoardsRepository.find({ relations: ['testAuth'] });
    // return boards;
  }

  // 게시물 생성
  async createBoard({
    createTestBoardDto,
    user,
  }: ITestBoardsServiceDto): Promise<any> {
    const { title, description } = createTestBoardDto;
    // return user.id;
    return await this.testBoardsRepository.save({
      title,
      description,
      status: TestBoardStatus.PUBLIC,
      user,
    });
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
  deleteBoard(id: number): Promise<any> {
    return this.testBoardsRepository.delete({ id });
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
