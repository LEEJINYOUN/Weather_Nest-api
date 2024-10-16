import { Bookmark } from '../entities/bookmark.entity';

export interface IBookmarksServiceInput {
  locationKr: string;
  locationEn: string;
  imageNumber: number;
}

export interface IBookmarksServiceCreate {
  userId: number;
  createBookmarkDto: IBookmarksServiceInput;
}

export interface IBookmarksServiceGetBookmarkByKr {
  userId: number;
  locationKr: string;
}

export interface IBookmarksServiceGetLocationByKr {
  bookmarkList: Bookmark[];
  locationKr: string;
}
