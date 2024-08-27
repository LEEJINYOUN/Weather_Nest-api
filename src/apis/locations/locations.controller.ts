import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationInput } from './dto/create-location.input';
import { Location } from './entities/location.entity';

@Controller('location')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // 모든 지역명 조회
  @Get()
  getLocations(): Promise<Location[]> {
    return this.locationsService.getLocations();
  }

  // 지역명 등록
  @Post()
  async createLocation(
    @Body() createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return await this.locationsService.createLocation({
      location_kr: createLocationInput.location_kr,
      location_en: createLocationInput.location_en,
    });
  }

  // 특정 지역명 조회
  @Get(':id')
  getLocationById(@Param('id') id: number): Promise<Location> {
    return this.locationsService.getLocationById(id);
  }

  // 특정 지역명 수정
  @Put(':id')
  async updateLocation(
    @Param('id') id: number,
    @Body() createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return await this.locationsService.updateLocation(id, createLocationInput);
  }

  // 특정 지역명 삭제
  @Delete(':id')
  deleteLocation(@Param('id') id: number): Promise<boolean> {
    return this.locationsService.deleteLocation(id);
  }
}
