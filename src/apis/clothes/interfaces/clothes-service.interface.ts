import { Clothes } from '../entities/clothes.entity';

export interface IClothesServiceStore {
  category: string;
  name: string;
  startTemp: number;
  endTemp: number;
  image: string;
}

export interface IClothesServiceFindOneByImage {
  image: string;
}

export interface IClothesServiceFindEndTemp {
  temp: number;
  startClothes: Clothes[];
}
