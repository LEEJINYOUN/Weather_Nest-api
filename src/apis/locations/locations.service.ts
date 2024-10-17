import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import {
  ILocationsServiceFindOneByKr,
  ILocationsServiceFindOneByName,
} from './interfaces/location-service.interface';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}

  // 나라별 모든 지역 조회
  async getAllLocationByCountryId(countryId: number): Promise<Location[]> {
    if (countryId == 0) {
      return this.locationsRepository.find({
        order: { id: 'ASC' },
      });
    } else {
      return this.locationsRepository.find({
        where: { countryId },
        order: { locationName: 'ASC' },
      });
    }
  }

  // 나라별 지역 조회
  async getLocationByName({
    countryId,
    locationName,
  }: ILocationsServiceFindOneByName): Promise<any> {
    // 1. 지역 목록 조회
    const locationList = await this.getAllLocationByCountryId(countryId);

    // 2. 지역 체크
    const isLocation = await this.getLocationFindOneByKr({
      locationList,
      locationName,
    });

    if (isLocation.length == 1) {
      return isLocation[0];
    } else {
      return 0;
    }
  }

  //  지역 체크
  async getLocationFindOneByKr({
    locationList,
    locationName,
  }: ILocationsServiceFindOneByKr): Promise<Location[]> {
    return locationList.filter((item: any, key: number) => {
      if (item.locationName == locationName) {
        return item;
      }
    });
  }

  // 지역 등록
  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const isLocation = await this.locationsRepository.findOne({
      where: { locationName: createLocationDto.locationName },
    });

    // 1. 일치하는 지역이 있는 경우
    if (isLocation) throw new ConflictException('이미 등록된 지역입니다.');

    // 2. 지역 등록 성공
    return await this.locationsRepository.save({
      countryId: createLocationDto.countryId,
      locationName: createLocationDto.locationName,
    });
  }

  // id로 지역 찾기
  findLocationById(id: number) {
    return this.locationsRepository.findOne({
      where: { id },
    });
  }

  // 특정 지역 수정
  async updateLocation(
    id: number,
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const location = await this.findLocationById(id);

    Object.assign(location, createLocationDto);

    return await this.locationsRepository.save(location);
  }

  // 특정 지역 삭제
  async deleteLocation(id: number): Promise<boolean> {
    const result = await this.locationsRepository.delete({ id });
    return result.affected ? true : false;
  }
}
