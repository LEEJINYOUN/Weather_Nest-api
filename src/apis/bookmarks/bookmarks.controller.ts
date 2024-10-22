import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';

@Controller('bookmark')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  // 유저별 모든 즐겨찾기 조회
  // @Get('all/:userId')
  // getAllBookmark(@Param('userId') userId: number): Promise<Bookmark[]> {
  //   return this.bookmarksService.getAllBookmark(userId);
  // }

  // // 유저별 즐겨찾기 지역 조회
  // @Get(':userId')
  // getBookmarkByKr(
  //   @Param('userId') userId: number,
  //   @Query('locationKr') locationKr: string,
  // ): Promise<any> {
  //   return this.bookmarksService.getBookmarkByKr({
  //     userId,
  //     locationKr,
  //   });
  // }

  // // 즐겨찾기 추가 및 삭제
  // @Post('update/:userId')
  // async updateBookmark(
  //   @Param('userId') userId: number,
  //   @Body() createBookmarkDto: CreateBookmarkDto,
  // ): Promise<string> {
  //   return this.bookmarksService.updateBookmark({
  //     userId,
  //     createBookmarkDto,
  //   });
  // }
}
