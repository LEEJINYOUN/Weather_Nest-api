import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';

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
  getCountryById(@Param('id') id: number): Promise<any> {
    return this.countriesService.getCountryById(id);
  }

  // // 나라 등록
  // @Post('create')
  // async createCountry(
  //   @Body() createCountryDto: CreateCountryDto,
  // ): Promise<Country> {
  //   return await this.countriesService.createCountry(createCountryDto);
  // }

  // // 특정 나라 수정
  // @Put(':id')
  // async updateCountry(
  //   @Param('id') id: number,
  //   @Body() createCountryDto: CreateCountryDto,
  // ): Promise<Country> {
  //   return await this.countriesService.updateCountry(id, createCountryDto);
  // }

  // // 특정 나라 삭제
  // @Delete(':id')
  // async deleteCountry(@Param('id') id: number): Promise<boolean> {
  //   return await this.countriesService.deleteCountry(id);
  // }
}
