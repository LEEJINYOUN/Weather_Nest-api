import { Injectable } from '@nestjs/common';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IBookmarksServiceCreate,
  IBookmarksServiceGetBookmarkLocation,
  IBookmarksServiceGetLocationId,
} from './interfaces/bookmarks-service.interface';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarksRepository: Repository<Bookmark>,
  ) {}

  // 유저별 즐겨찾기 목록 조회
  async getBookmarks(user_id: number): Promise<Bookmark[]> {
    return this.bookmarksRepository.find({
      where: { user_id },
    });
  }

  // 유저별 즐겨찾기 지역 조회
  async getBookmarkLocation({
    user_id,
    location_id,
  }: IBookmarksServiceGetBookmarkLocation): Promise<any> {
    // 즐겨찾기 목록 조회
    const bookmarkList = await this.getBookmarks(user_id);

    // 즐겨찾기 지역 체크
    const isLocation = await this.getLocationId({ bookmarkList, location_id });

    if (isLocation.length == 1) {
      return isLocation[0];
    } else {
      return 0;
    }
  }

  // 즐겨찾기 지역 체크
  async getLocationId({
    bookmarkList,
    location_id,
  }: IBookmarksServiceGetLocationId): Promise<Bookmark[]> {
    return bookmarkList.filter((item: any, key: number) => {
      if (item.location_id == location_id) {
        return item;
      }
    });
  }

  // 즐겨찾기 추가 및 삭제
  async editBookmark({
    user_id,
    location_id,
    location_kr,
    location_en,
  }: IBookmarksServiceCreate): Promise<any> {
    // 유저별 즐겨찾기 지역 조회
    const isLocation = await this.getBookmarkLocation({ user_id, location_id });

    if (isLocation === 0) {
      return this.createBookmark({
        user_id,
        location_id,
        location_kr,
        location_en,
      });
    } else {
      return this.deleteBookmark(isLocation.id);
    }
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

  // // 즐겨찾기 삭제
  async deleteBookmark(id: number): Promise<boolean> {
    const result = await this.bookmarksRepository.delete({ id });
    return result.affected ? true : false;
  }
}
