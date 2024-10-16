import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import {
  ILocationsServiceFindOneByLocation,
  ILocationsServiceStore,
} from './interfaces/location-service.interface';
import { CreateLocationInput } from './dto/create-location.input';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}

  // // 지역 체크
  // findLocation({ location }: ILocationsServiceFindOneByLocation) {
  //   return this.locationsRepository.findOne({ where: { location } });
  // }

  // // id로 지역 찾기
  // findLocationId(id: number) {
  //   return this.locationsRepository.findOne({
  //     where: { id },
  //   });
  // }

  // // 모든 지역 조회
  // async getLocations(): Promise<Location[]> {
  //   return await this.locationsRepository.find();
  // }

  // // 옷 등록
  // async createLocation({
  //   country_id,
  //   location,
  // }: ILocationsServiceStore): Promise<Location> {
  //   // 등록된 지역 체크
  //   const isLocation = await this.findLocation({ location });

  //   // 일치하는 지역이 있는 경우
  //   if (isLocation) throw new ConflictException('이미 등록된 지역입니다.');

  //   return await this.locationsRepository.save({
  //     country_id,
  //     location,
  //   });
  // }

  // // 나라 별 지역 조회
  // async getLocationsByCountryId(country_id: number): Promise<Location[]> {
  //   const countryLocations = this.locationsRepository.find({
  //     where: { country_id },
  //   });

  //   return countryLocations;
  // }

  // //특정 옷 수정
  // async updateLocation(
  //   id: number,
  //   createLocationInput: CreateLocationInput,
  // ): Promise<Location> {
  //   const Location = await this.findLocationId(id);

  //   Object.assign(Location, createLocationInput);

  //   return await this.locationsRepository.save(Location);
  // }

  // // 특정 지역 삭제
  // async deleteLocation(id: number): Promise<boolean> {
  //   const result = await this.locationsRepository.delete({ id });
  //   return result.affected ? true : false;
  // }
}
