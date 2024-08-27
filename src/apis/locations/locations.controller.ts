import { Body, Controller, Get, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationInput } from './dto/create-location.input';
import { Location } from './entities/location.entity';

@Controller()
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // 모든 지역 조회
  @Get('location')
  findAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }

  // 지역 등록
  @Post('location')
  async store(
    @Body() createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return this.locationsService.store({
      location_kr: createLocationInput.location_kr,
      location_en: createLocationInput.location_en,
    });
  }
}
