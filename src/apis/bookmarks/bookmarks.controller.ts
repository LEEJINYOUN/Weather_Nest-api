import { Body, Controller, Param, Post } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkInput } from './dto/create-bookmark.input';
import { Bookmark } from './entities/bookmark.entity';

@Controller('bookmark')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  // 유저별 즐겨찾기 목록 조회
  @Post(':user_id/list')
  getBookmarks(
    @Param('user_id') user_id: number,
    @Body('location_id') location_id: number,
  ): Promise<Bookmark[]> {
    return this.bookmarksService.getBookmarks({ user_id, location_id });
  }

  // 즐겨찾기 추가 및 삭제
  @Post(':user_id')
  async bookmark(
    @Param('user_id') user_id: number,
    @Body() createBookmarkInput: CreateBookmarkInput,
  ): Promise<string> {
    return this.bookmarksService.bookmark({
      user_id,
      location_id: createBookmarkInput.location_id,
      location_kr: createBookmarkInput.location_kr,
      location_en: createBookmarkInput.location_en,
    });
  }
}
