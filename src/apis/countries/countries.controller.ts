import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

@Controller('country')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  // 모든 나라 조회
  @Get('all')
  getAllCountry(): Promise<Country[]> {
    return this.countriesService.getAllCountry();
  }

  // 특정 나라 조회
  @Get(':id')
  getCountryById(@Param('id') id: number): Promise<Country> {
    return this.countriesService.getCountryById(id);
  }

  // 나라 등록
  @Post('create')
  async createCountry(@Body() name: string): Promise<Country> {
    return await this.countriesService.createCountry(name);
  }

  // 특정 나라 수정
  @Patch(':id')
  async updateCountry(
    @Param('id') id: number,
    @Body() name: string,
  ): Promise<Country> {
    return await this.countriesService.updateCountry(id, name);
  }

  // 특정 나라 삭제
  @Delete(':id')
  async deleteCountry(@Param('id') id: number): Promise<boolean> {
    return await this.countriesService.deleteCountry(id);
  }
}
