import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
    private readonly countriesService: CountriesService,
  ) {}

  // 모든 지역 조회
  getAllLocation(): Promise<Location[]> {
    return this.locationsRepository.find({
      order: { locationName: 'ASC' },
    });
  }

  // 나라별 지역 조회
  getAllLocationByCountry(countryId: number): Promise<Location[]> {
    // 1. 쿼리 설정
    const query = this.locationsRepository.createQueryBuilder('location');

    // 2. 쿼리로 조회
    query.where('location.countriesId =:countryId', { countryId });

    const location = query.getMany();

    return location;
  }

  // 지역 등록
  async createLocation(
    countryId: number,
    locationName: string,
  ): Promise<Location> {
    // 1. 나라 정보 조회
    const countryById = await this.countriesService.getCountryById(countryId);

    // 2. 지역 체크
    const isLocation = await this.locationsRepository.findOne({
      where: { locationName },
    });

    // 3. 일치하는 지역이 있는 경우
    if (isLocation) throw new ConflictException('이미 등록된 지역입니다.');

    return this.locationsRepository.save({
      locationName,
      countries: countryById,
    });
  }

  // 특정 지역 삭제
  async deleteLocation(id: number): Promise<boolean> {
    const result = await this.locationsRepository.delete({ id });
    return result.affected ? true : false;
  }
}
