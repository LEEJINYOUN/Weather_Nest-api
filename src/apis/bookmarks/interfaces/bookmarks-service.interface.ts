import { Bookmark } from '../entities/bookmark.entity';

export interface IBookmarksServiceDto {
  locationKr: string;
  locationEn: string;
  imageNumber: number;
}

export interface IBookmarksServiceCreate {
  userId: number;
  createBookmarkDto: IBookmarksServiceDto;
}

export interface IBookmarksServiceGetBookmarkByKr {
  userId: number;
  locationKr: string;
}

export interface IBookmarksServiceGetLocationByKr {
  bookmarkList: Bookmark[];
  locationKr: string;
}
