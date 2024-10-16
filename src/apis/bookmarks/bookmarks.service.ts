import { Injectable } from '@nestjs/common';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IBookmarksServiceCreate,
  IBookmarksServiceGetBookmarkByKr,
  IBookmarksServiceGetLocationByKr,
} from './interfaces/bookmarks-service.interface';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarksRepository: Repository<Bookmark>,
  ) {}

  // 유저별 즐겨찾기 목록 조회
  async getAllBookmark(userId: number): Promise<Bookmark[]> {
    return this.bookmarksRepository.find({
      where: { userId },
    });
  }

  // 유저별 즐겨찾기 지역 조회
  async getBookmarkByKr({
    userId,
    locationKr,
  }: IBookmarksServiceGetBookmarkByKr): Promise<any> {
    // 즐겨찾기 목록 조회
    const bookmarkList = await this.getAllBookmark(userId);

    // // 즐겨찾기 지역 체크
    const isLocation = await this.getLocationByKr({ bookmarkList, locationKr });
    if (isLocation.length == 1) {
      return isLocation[0];
    } else {
      return 0;
    }
  }

  // 즐겨찾기 지역 체크
  async getLocationByKr({
    bookmarkList,
    locationKr,
  }: IBookmarksServiceGetLocationByKr): Promise<Bookmark[]> {
    return bookmarkList.filter((item: any, key: number) => {
      if (item.locationKr == locationKr) {
        return item;
      }
    });
  }

  // 즐겨찾기 추가 및 삭제
  async updateBookmark({
    userId,
    createBookmarkDto,
  }: IBookmarksServiceCreate): Promise<any> {
    const isBookmark = await this.getBookmarkByKr({
      userId,
      locationKr: createBookmarkDto.locationKr,
    });
    if (isBookmark == 0) {
      return await this.createBookmark({
        userId,
        createBookmarkDto,
      });
    } else {
      return await this.deleteBookmark(isBookmark.id);
    }
  }

  // 즐겨찾기 추가
  async createBookmark({
    userId,
    createBookmarkDto,
  }: IBookmarksServiceCreate): Promise<Bookmark> {
    const saveBookmark = await this.bookmarksRepository.save({
      userId,
      locationKr: createBookmarkDto.locationKr,
      locationEn: createBookmarkDto.locationEn,
      imageNumber: createBookmarkDto.imageNumber,
    });
    return saveBookmark;
  }

  // 즐겨찾기 삭제
  async deleteBookmark(id: number): Promise<boolean> {
    const result = await this.bookmarksRepository.delete({ id });
    return result.affected ? true : false;
  }
}
