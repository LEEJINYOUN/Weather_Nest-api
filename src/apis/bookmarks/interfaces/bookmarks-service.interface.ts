export interface IBookmarksServiceCreate {
  user_id: number;
  location_kr: string;
  location_en: string;
}

export interface IBookmarksServiceFindOneByLocation {
  location_kr: string;
}
