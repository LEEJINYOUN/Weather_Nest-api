import { Body, Controller, Post } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkInput } from './dto/create-bookmark.input';
import { Bookmark } from './entities/bookmark.entity';

@Controller()
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  // 즐겨찾기
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
