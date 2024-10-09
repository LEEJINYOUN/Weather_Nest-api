import { Bookmark } from '../entities/bookmark.entity';

export interface IBookmarksServiceCreate {
  user_id: number;
  location_kr: string;
  location_en: string;
  image_number: number;
}

export interface IBookmarksServiceGetBookmarkLocation {
  user_id: number;
  location_kr: string;
}

export interface IBookmarksServiceGetLocationId {
  bookmarkList: Bookmark[];
  location_kr: string;
}
