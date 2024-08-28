import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkInput } from './dto/create-bookmark.input';
import { Bookmark } from './entities/bookmark.entity';

@Controller()
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  // 즐겨찾기 목록 조회
  @Get('bookmark/:user_id')
  getBookmarks(@Param('user_id') user_id: number): Promise<Bookmark[]> {
    return this.bookmarksService.getBookmarks(user_id);
  }

  // 즐겨찾기 추가 및 삭제
  @Post('bookmark')
  async bookmark(
    @Body() createBookmarkInput: CreateBookmarkInput,
  ): Promise<Bookmark> {
    return this.bookmarksService.bookmark({
      user_id: createBookmarkInput.user_id,
      location_kr: createBookmarkInput.location_kr,
      location_en: createBookmarkInput.location_en,
    });
  }
}
