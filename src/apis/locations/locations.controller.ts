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
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('location')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // 나라별 모든 지역 조회
  @Get('all/:countryId')
  getAllLocation(@Param('countryId') countryId: number): Promise<Location[]> {
    return this.locationsService.getAllLocation(countryId);
  }

  // 나라별 지역 조회
  @Get(':countryId')
  getLocationByName(
    @Param('countryId') countryId: number,
    @Query('locationName') locationName: string,
  ): Promise<any> {
    return this.locationsService.getLocationByName({
      countryId,
      locationName,
    });
  }

  // 지역 등록
  @Post('create')
  async createLocation(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return await this.locationsService.createLocation(createLocationDto);
  }

  // 특정 지역 수정
  @Put(':id')
  async updateLocation(
    @Param('id') id: number,
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return await this.locationsService.updateLocation(id, createLocationDto);
  }

  // 특정 지역 삭제
  @Delete(':id')
  async deleteLocation(@Param('id') id: number): Promise<boolean> {
    return await this.locationsService.deleteLocation(id);
  }
}
