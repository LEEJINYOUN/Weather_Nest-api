import { Injectable } from '@nestjs/common';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IBookmarksGetList,
  IBookmarksServiceCreate,
} from './interfaces/bookmarks-service.interface';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarksRepository: Repository<Bookmark>,
  ) {}

  // 유저별 즐겨찾기 목록 조회
  async getBookmarks({
    user_id,
    location_id,
  }: IBookmarksGetList): Promise<Bookmark[]> {
    return this.bookmarksRepository.find({
      where: { user_id, location_id },
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
    location_id,
    location_kr,
    location_en,
  }: IBookmarksServiceCreate): Promise<Bookmark> {
    const saveBookmark = await this.bookmarksRepository.save({
      user_id,
      location_id,
      location_kr,
      location_en,
    });
    return saveBookmark;
  }

  // 즐겨찾기 추가 및 삭제
  async bookmark({
    user_id,
    location_id,
    location_kr,
    location_en,
  }: IBookmarksServiceCreate): Promise<string> {
    // // 즐겨찾기 체크
    const isBookmark = await this.getBookmarks({ user_id, location_id });

    // 일치하는 값이 없는 경우
    if (!isBookmark[0]) {
      // 즐겨찾기 추가
      this.createBookmark({ user_id, location_id, location_kr, location_en });
      return '즐겨찾기 추가';
    } else {
      // 즐겨찾기 삭제
      this.deleteBookmark(isBookmark[0].id);
      return '즐겨찾기 삭제';
    }
  }
}
