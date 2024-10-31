import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './entities/location.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('지역 API')
@Controller('location')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // 모든 지역 조회
  @Get('all')
  @ApiOperation({
    summary: '모든 지역 조회',
    description: '모든 지역 리스트를 조회합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '지역 리스트 조회에 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '지역 리스트 조회에 실패하였습니다.',
  })
  getAllLocation(): Promise<Location[]> {
    return this.locationsService.getAllLocation();
  }

  // 나라별 지역 조회
  @Get(':countryId')
  @ApiOperation({
    summary: '나라별 지역 조회',
    description: '나라별 지역을 조회합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '지역 조회에 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '지역 조회에 실패하였습니다.',
  })
  @ApiParam({ name: 'countryId', required: true, description: '나라 id' })
  getAllLocationByCountry(
    @Param('countryId') countryId: number,
  ): Promise<Location[]> {
    return this.locationsService.getAllLocationByCountry(countryId);
  }

  // 지역 등록
  @Post('create/:countryId')
  @ApiOperation({
    summary: '지역 등록',
    description: '지역을 등록합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '지역 등록에 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '지역 등록에 실패하였습니다.',
  })
  @ApiParam({ name: 'countryId', required: true, description: '나라 id' })
  @ApiBody({
    schema: {
      properties: {
        locationName: { type: 'string' },
      },
    },
  })
  async createLocation(
    @Param('countryId') countryId: number,
    @Body() locationName: string,
  ): Promise<Location> {
    return await this.locationsService.createLocation(countryId, locationName);
  }

  // 특정 지역 삭제
  @Delete(':id')
  @ApiOperation({
    summary: '지역 삭제',
    description: '지역를 삭제합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '지역 삭제를 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '지역 삭제를 실패하였습니다.',
  })
  @ApiParam({ name: 'id', required: true, description: '지역 id' })
  async deleteLocation(@Param('id') id: number): Promise<boolean> {
    return await this.locationsService.deleteLocation(id);
  }
}
