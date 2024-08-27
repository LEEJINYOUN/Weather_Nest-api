import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationInput } from './dto/create-location.input';
import { Location } from './entities/location.entity';

@Controller('location')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // 모든 지역 조회
  @Get()
  findAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }

  // 지역 등록
  @Post()
  async store(
    @Body() createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return this.locationsService.store({
      location_kr: createLocationInput.location_kr,
      location_en: createLocationInput.location_en,
    });
  }

  // 특정 지역명 조회
  @Get('/:id')
  getLocationById(@Param('id') id: number): Promise<Location> {
    return this.locationsService.getLocationById(id);
  }

  // 특정 지역명 삭제
  @Delete('/:id')
  deleteLocation(@Param('id') id: number): Promise<boolean> {
    return this.locationsService.remove(id);
  }
}
