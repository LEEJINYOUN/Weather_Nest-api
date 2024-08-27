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

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}

  // 모든 지역 조회
  findAll(): Promise<Location[]> {
    return this.locationsRepository.find();
  }

  // 지역명 체크 (한글)
  findOneByLocationKr({ location_kr }: ILocationsServiceFindOneByLocation) {
    return this.locationsRepository.findOne({ where: { location_kr } });
  }

  // 지역명 체크 (영문)
  findOneByLocationEn({ location_en }: ILocationsServiceFindOneByLocation) {
    return this.locationsRepository.findOne({ where: { location_en } });
  }

  // 지역 등록
  async store({
    location_kr,
    location_en,
  }: ILocationsServiceStore): Promise<Location> {
    // 등록된 지역명 체크
    const isKr = await this.findOneByLocationKr({ location_kr });
    const isEn = await this.findOneByLocationEn({ location_en });

    // 일치하는 지역명이 있는 경우
    if (isKr || isEn) throw new ConflictException('이미 등록된 지역입니다.');

    // 지역 등록 성공
    return this.locationsRepository.save({
      location_kr,
      location_en,
    });
  }

  // 특정 지역명 조회
  getLocationById(id: number): Promise<Location> {
    const isLocation = this.locationsRepository.findOne({
      where: { id },
    });
    if (!isLocation) {
      throw new NotFoundException(`${id}번은 찾을 수 없습니다.`);
    }
    return isLocation;
  }

  // 특정 지역명 삭제
  async remove(id: number) {
    const result = await this.locationsRepository.delete({ id });
    return result.affected ? true : false;
  }
}
