import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import {
  ILocationsServiceFindOneByLocation,
  ILocationsServiceStore,
} from './interfaces/locations-service.interface';
import { CreateLocationInput } from './dto/create-location.input';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}

  // 모든 지역 조회
  getLocations(): Promise<Location[]> {
    return this.locationsRepository.find();
  }

  // 지역명 체크 (한글)
  findLocationKr({ location_kr }: ILocationsServiceFindOneByLocation) {
    return this.locationsRepository.findOne({ where: { location_kr } });
  }

  // 지역명 체크 (영문)
  findLocationEn({ location_en }: ILocationsServiceFindOneByLocation) {
    return this.locationsRepository.findOne({ where: { location_en } });
  }

  // 지역명 체크 (id)
  findLocationId(id: number) {
    return this.locationsRepository.findOne({
      where: { id },
    });
  }

  // 지역 등록
  async createLocation({
    location_kr,
    location_en,
  }: ILocationsServiceStore): Promise<Location> {
    // 등록된 지역명 체크
    const isKr = await this.findLocationKr({ location_kr });
    const isEn = await this.findLocationEn({ location_en });

    // 일치하는 지역명이 있는 경우
    if (isKr || isEn) throw new ConflictException('이미 등록된 지역입니다.');

    // 지역 등록 성공
    return await this.locationsRepository.save({
      location_kr,
      location_en,
    });
  }

  // 특정 지역명 조회
  getLocationById(id: number): Promise<Location> {
    const isLocation = this.findLocationId(id);
    if (!isLocation) {
      throw new NotFoundException(`${id}번은 찾을 수 없습니다.`);
    }
    return isLocation;
  }

  // 특정 지역명 이름으로 조회
  async getLocationByName(name: string): Promise<any> {
    const isLocation = await this.locationsRepository.findOne({
      where: { location_kr: name },
    });
    return isLocation;
  }

  // 특정 지역명 수정
  async updateLocation(
    id: number,
    createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    const location = await this.findLocationId(id);

    Object.assign(location, createLocationInput);

    return await this.locationsRepository.save(location);
  }

  // 특정 지역명 삭제
  async deleteLocation(id: number): Promise<boolean> {
    const result = await this.locationsRepository.delete({ id });
    return result.affected ? true : false;
  }
}
