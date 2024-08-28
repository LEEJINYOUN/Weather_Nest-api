import { ConflictException, Injectable } from '@nestjs/common';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IBookmarksServiceCreate,
  IBookmarksServiceFindOneByLocation,
} from './interfaces/bookmarks-service.interface';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarksRepository: Repository<Bookmark>,
  ) {}

  // 즐겨찾기 체크
  checkBookmark({ location_kr }: IBookmarksServiceFindOneByLocation) {
    return this.bookmarksRepository.findOne({ where: { location_kr } });
  }

  // 즐겨찾기 해제
  async deleteBookmark(id: number): Promise<boolean> {
    const result = await this.bookmarksRepository.delete({ id });
    return result.affected ? true : false;
  }

  // 즐겨찾기 등록
  async createBookmark(
    user_id: number,
    location_kr: string,
    location_en: string,
  ): Promise<Bookmark> {
    const saveBookmark = await this.bookmarksRepository.save({
      user_id,
      location_kr,
      location_en,
    });
    return saveBookmark;
  }

  // 즐겨찾기
  async bookmark({
    user_id,
    location_kr,
    location_en,
  }: IBookmarksServiceCreate): Promise<any> {
    // 즐겨찾기 체크
    const isBookmark = await this.checkBookmark({ location_kr });

    // 일치하는 목록이 있는 경우
    if (isBookmark) {
      // 즐겨찾기 해제
      this.deleteBookmark(isBookmark.id);
      return '즐겨찾기 해제';
    } else {
      // 즐겨찾기 등록
      this.createBookmark(user_id, location_kr, location_en);
      return '즐겨찾기 등록';
    }
  }
}
