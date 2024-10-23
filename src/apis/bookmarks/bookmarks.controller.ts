import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookmark')
@UseGuards(AuthGuard())
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  // 유저별 모든 즐겨찾기 조회
  @Get('all/:userId')
  getAllBookmark(@Param('userId') userId: number): Promise<Bookmark[]> {
    return this.bookmarksService.getAllBookmark(userId);
  }

  // 즐겨찾기 수정
  @Post('edit/:userId')
  async editBookmark(
    @Param('userId') userId: number,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<string> {
    return this.bookmarksService.editBookmark(userId, createBookmarkDto);
  }
}
