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

  // 유저별 즐겨찾기 목록 조회
  getBookmarks(user_id: number): Promise<Bookmark[]> {
    return this.bookmarksRepository.find({
      where: { user_id },
    });
  }

  // 즐겨찾기 체크
  checkBookmark({ user_id, location_kr }: IBookmarksServiceFindOneByLocation) {
    return this.bookmarksRepository.findOne({
      where: { user_id, location_kr },
    });
  }

  // 즐겨찾기 삭제
  async deleteBookmark(id: number): Promise<boolean> {
    const result = await this.bookmarksRepository.delete({ id });
    return result.affected ? true : false;
  }

  // 즐겨찾기 추가
  async createBookmark({
    user_id,
    location_kr,
    location_en,
  }: IBookmarksServiceCreate): Promise<Bookmark> {
    const saveBookmark = await this.bookmarksRepository.save({
      user_id,
      location_kr,
      location_en,
    });
    return saveBookmark;
  }

  // 즐겨찾기 추가 및 삭제
  async bookmark({
    user_id,
    location_kr,
    location_en,
  }: IBookmarksServiceCreate): Promise<any> {
    // 즐겨찾기 체크
    const isBookmark = await this.checkBookmark({ user_id, location_kr });

    // 일치하는 목록이 있는 경우
    if (isBookmark) {
      // 즐겨찾기 삭제
      this.deleteBookmark(isBookmark.id);
      return '즐겨찾기 삭제';
    } else {
      // 즐겨찾기 추가
      this.createBookmark({ user_id, location_kr, location_en });
      return '즐겨찾기 추가';
    }
  }
}
