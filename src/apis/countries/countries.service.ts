import { ConflictException, Injectable } from '@nestjs/common';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countriesRepository: Repository<Country>,
  ) {}

  // 모든 나라 조회
  getAllCountry(): Promise<Country[]> {
    return this.countriesRepository.find();
  }

  // 특정 나라 조회
  getCountryById(id: number): Promise<Country> {
    // 1. 쿼리 설정
    const query = this.countriesRepository.createQueryBuilder('country');

    // 2. 쿼리로 조회
    query.where('country.id =:id', { id });

    const country = query.getOne();

    return country;
  }

  // 나라 등록
  async createCountry(name: string): Promise<Country> {
    // 1. 나라 조회
    const isCountry = await this.countriesRepository.findOne({
      where: { name },
    });

    // 2. 일치하는 나라가 있는 경우
    if (isCountry) throw new ConflictException('이미 등록된 나라입니다.');

    // 3. 나라 등록 성공
    return await this.countriesRepository.save({
      name,
    });
  }

  // 특정 나라 수정
  async updateCountry(id: number, name: string): Promise<Country> {
    // 1. id로 특정 나라 조회
    const findCountryById = await this.countriesRepository.findOne({
      where: { id },
    });

    Object.assign(findCountryById, { name });

    return await this.countriesRepository.save(findCountryById);
  }

  // 특정 나라 삭제
  async deleteCountry(id: number): Promise<boolean> {
    const result = await this.countriesRepository.delete({ id });
    return result.affected ? true : false;
  }
}
