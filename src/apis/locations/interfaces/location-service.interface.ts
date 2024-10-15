export interface ILocationsServiceStore {
  country_id: number;
  location: string;
}

export interface ILocationsServiceFindOneByLocation {
  location: string;
}
