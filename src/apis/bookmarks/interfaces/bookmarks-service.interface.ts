export interface IBookmarksServiceCreate {
  user_id: number;
  location_id: number;
  location_kr: string;
  location_en: string;
}

export interface IBookmarksGetList {
  user_id: number;
  location_id: number;
}

export interface IBookmarksServiceFindOneByLocation {
  user_id: number;
  location_kr: string;
}
