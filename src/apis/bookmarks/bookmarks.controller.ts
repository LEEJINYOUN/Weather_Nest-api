import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('즐겨찾기 API')
@Controller('bookmark')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  // 유저별 모든 즐겨찾기 조회
  @Get('all/:userId')
  @ApiOperation({
    summary: '즐겨찾기 리스트 조회',
    description: '유저별 즐겨찾기 리스트를 조회합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '즐겨찾기 리스트 조회에 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '즐겨찾기 리스트 조회에 실패하였습니다.',
  })
  @ApiParam({ name: 'userId', required: true, description: '유저 id' })
  getAllBookmark(@Param('userId') userId: number): Promise<Bookmark[]> {
    return this.bookmarksService.getAllBookmark(userId);
  }

  // 즐겨찾기 수정
  @Post('edit/:userId')
  @ApiParam({ name: 'userId', required: true, description: '유저 id' })
  @ApiOperation({
    summary: '즐겨찾기 수정',
    description: '즐겨찾기를 수정합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '즐겨찾기 수정을 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '즐겨찾기 수정을 실패하였습니다.',
  })
  async editBookmark(
    @Param('userId') userId: number,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<any> {
    return await this.bookmarksService.editBookmark(userId, createBookmarkDto);
  }
}
