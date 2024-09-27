import { Bookmark } from '../entities/bookmark.entity';

export interface IBookmarksServiceCreate {
  user_id: number;
  location_id: number;
  location_kr: string;
  location_en: string;
}

export interface IBookmarksServiceGetBookmarkLocation {
  user_id: number;
  location_id: number;
}

export interface IBookmarksServiceGetLocationId {
  bookmarkList: Bookmark[];
  location_id: number;
}
