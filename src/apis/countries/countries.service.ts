import {
  ConflictException,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';

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
  async getCountryByName(name: string): Promise<Country> {
    const isCountry = await this.countriesRepository.findOne({
      where: { name },
    });
    if (!isCountry) throw new NotFoundException(`${name}은 존재하지 않습니다.`);
    return isCountry;
  }

  // 나라 등록
  async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    const isCountry = await this.countriesRepository.findOne({
      where: { name: createCountryDto.name },
    });

    // 일치하는 나라가 있는 경우
    if (isCountry) throw new ConflictException('이미 등록된 나라입니다.');

    // 옷 등록 성공
    return await this.countriesRepository.save({
      name: createCountryDto.name,
    });
  }

  // id로 나라 찾기
  findCountryById(id: number) {
    return this.countriesRepository.findOne({
      where: { id },
    });
  }

  //특정 나라 수정
  async updateCountry(
    id: number,
    createCountryDto: CreateCountryDto,
  ): Promise<Country> {
    const clothes = await this.findCountryById(id);

    Object.assign(clothes, createCountryDto);

    return await this.countriesRepository.save(clothes);
  }

  // 특정 나라 삭제
  async deleteCountry(id: number): Promise<boolean> {
    const result = await this.countriesRepository.delete({ id });
    return result.affected ? true : false;
  }
}
