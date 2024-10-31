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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('나라 API')
@Controller('country')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  // 모든 나라 조회
  @Get('all')
  @ApiOperation({
    summary: '모든 나라 조회',
    description: '모든 나라 리스트를 조회합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '나라 리스트 조회에 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '나라 리스트 조회에 실패하였습니다.',
  })
  getAllCountry(): Promise<Country[]> {
    return this.countriesService.getAllCountry();
  }

  // 특정 나라 조회
  @Get(':id')
  @ApiOperation({
    summary: '특정 나라 조회',
    description: '특정 나라를 조회합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '나라 조회에 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '나라 조회에 실패하였습니다.',
  })
  @ApiParam({ name: 'id', required: true, description: '나라 id' })
  getCountryById(@Param('id') id: number): Promise<Country> {
    return this.countriesService.getCountryById(id);
  }

  // 나라 등록
  @Post('create')
  @ApiOperation({
    summary: '나라 등록',
    description: '나라를 등록합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '나라 등록에 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '나라 등록에 실패하였습니다.',
  })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  })
  async createCountry(@Body() name: string): Promise<Country> {
    return await this.countriesService.createCountry(name);
  }

  // 특정 나라 수정
  @Patch(':id')
  @ApiOperation({
    summary: '특정 나라 수정',
    description: '특정 나라를 수정합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '나라 수정을 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '나라 수정을 실패하였습니다.',
  })
  @ApiParam({ name: 'id', required: true, description: '나라 id' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  })
  async updateCountry(
    @Param('id') id: number,
    @Body() name: string,
  ): Promise<Country> {
    return await this.countriesService.updateCountry(id, name);
  }

  // 특정 나라 삭제
  @Delete(':id')
  @ApiOperation({
    summary: '나라 삭제',
    description: '나라를 삭제합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '나라 삭제를 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '나라 삭제를 실패하였습니다.',
  })
  @ApiParam({ name: 'id', required: true, description: '나라 id' })
  async deleteCountry(@Param('id') id: number): Promise<boolean> {
    return await this.countriesService.deleteCountry(id);
  }
}
