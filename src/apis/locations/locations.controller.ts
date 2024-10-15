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
import { LocationsService } from './locations.service';
import { Location } from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';

@Controller('location')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // 모든 지역 조회
  @Get('all')
  async getLocations(): Promise<Location[]> {
    return await this.locationsService.getLocations();
  }

  // 지역 등록
  @Post('create')
  async createLocation(
    @Body() createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return await this.locationsService.createLocation({
      country_id: createLocationInput.country_id,
      location: createLocationInput.location,
    });
  }

  // 나라 별 지역 조회
  @Get(':country_id')
  getLocationsByCountryId(
    @Param('country_id') country_id: number,
  ): Promise<Location[]> {
    return this.locationsService.getLocationsByCountryId(country_id);
  }

  // 특정 나라 수정
  @Put(':id')
  async updateLocation(
    @Param('id') id: number,
    @Body() createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return await this.locationsService.updateLocation(id, createLocationInput);
  }

  // 특정 나라 삭제
  @Delete(':id')
  async deleteLocation(@Param('id') id: number): Promise<boolean> {
    return await this.locationsService.deleteLocation(id);
  }
}
