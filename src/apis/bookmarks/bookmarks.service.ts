import { Injectable } from '@nestjs/common';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarksRepository: Repository<Bookmark>,
    private readonly usersService: UsersService,
  ) {}

  // 유저별 모든 즐겨찾기 조회
  getAllBookmark(userId: number): Promise<Bookmark[]> {
    // 1. 쿼리 설정
    const query = this.bookmarksRepository.createQueryBuilder('bookmark');

    // 2. 쿼리로 조회
    query.where('bookmark.userId =:userId', { userId });

    const bookmarks = query.getMany();

    return bookmarks;
  }

  // 즐겨찾기 수정
  async editBookmark(
    userId: number,
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<any> {
    const { locationKr, locationEn, imageNumber } = createBookmarkDto;

    // 1. 유저 정보 조회
    const userById = await this.usersService.getUserById(userId);

    // 2. 즐겨찾기 목록 조회
    const bookmarkList = await this.getAllBookmark(userId);

    // 3. 즐겨찾기 필터
    const bookmarkFilter = bookmarkList.filter((item: any, key: number) => {
      if (item.locationKr == locationKr) {
        return item;
      }
    });

    if (bookmarkFilter.length == 1) {
      // 4.1 즐겨찾기 되어 있는 경우
      const result = await this.bookmarksRepository.delete({
        id: bookmarkFilter[0].id,
      });
      return result.affected ? true : false;
    } else {
      // 4.2 즐겨찾기 되어 있지 않은 경우
      return this.bookmarksRepository.save({
        locationKr,
        locationEn,
        imageNumber,
        user: userById,
      });
    }
  }
}
