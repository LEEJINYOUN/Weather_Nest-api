export interface ILocationsServiceFindOneByName {
  countryId: number;
  locationName: string;
}

export interface ILocationsServiceFindOneByLocation {
  locationName: string;
}

export interface ILocationsServiceFindOneByKr {
  locationList: any[];
  locationName: string;
}
