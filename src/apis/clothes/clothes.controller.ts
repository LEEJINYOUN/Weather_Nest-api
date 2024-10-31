import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { Clothes } from './entities/clothes.entity';
import { CreateClothesDto } from './dto/create-clothes.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('옷 API')
@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  // 모든 옷 조회
  @Get('all')
  @ApiOperation({
    summary: '모든 옷 조회',
    description: '모든 옷 리스트를 조회합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '옷 리스트 조회에 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '옷 리스트 조회에 실패하였습니다.',
  })
  getClothes(): Promise<Clothes[]> {
    return this.clothesService.getClothes();
  }

  // 옷 등록
  @Post('create')
  @ApiOperation({
    summary: '옷 등록',
    description: '옷을 등록합니다.',
  })
  @ApiResponse({ status: 201, description: '옷 등록에 성공하였습니다' })
  @ApiResponse({ status: 404, description: '옷 등록에 실패하였습니다' })
  async createClothes(
    @Body() createClothesDto: CreateClothesDto,
  ): Promise<Clothes> {
    return await this.clothesService.createClothes(createClothesDto);
  }

  // 기온 별 옷 조회
  @Get(':temp')
  @ApiOperation({
    summary: '기온별 옷 리스트 조회',
    description: '기온별 옷 리스트를 조회합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '옷 리스트 조회를 성공하였습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '옷 리스트 조회를 실패하였습니다.',
  })
  @ApiParam({ name: 'temp', required: true, description: '기온' })
  getClothesByTemp(@Param('temp') temp: number): Promise<Clothes[] | number> {
    return this.clothesService.getClothesByTemp(temp);
  }

  // 특정 옷 수정
  @Patch(':id')
  @ApiOperation({
    summary: '옷 수정',
    description: '옷을 수정합니다.',
  })
  @ApiResponse({ status: 201, description: '옷 수정에 성공하였습니다' })
  @ApiResponse({ status: 404, description: '옷 수정에 실패하였습니다' })
  @ApiParam({ name: 'id', required: true, description: '옷 id' })
  async updateClothes(
    @Param('id') id: number,
    @Body() createClothesDto: CreateClothesDto,
  ): Promise<Clothes> {
    return await this.clothesService.updateClothes(id, createClothesDto);
  }

  // 특정 옷 삭제
  @Delete(':id')
  @ApiOperation({
    summary: '옷 삭제',
    description: '옷을 삭제합니다.',
  })
  @ApiResponse({ status: 201, description: '옷 삭제를 성공하였습니다' })
  @ApiResponse({ status: 404, description: '옷 삭제를 실패하였습니다' })
  @ApiParam({ name: 'id', required: true, description: '옷 id' })
  async deleteClothes(@Param('id') id: number): Promise<boolean> {
    return await this.clothesService.deleteClothes(id);
  }
}
