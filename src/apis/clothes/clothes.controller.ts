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

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  // 모든 옷 조회
  @Get('all')
  getClothes(): Promise<Clothes[]> {
    return this.clothesService.getClothes();
  }

  // 옷 등록
  @Post('create')
  async createClothes(
    @Body() createClothesDto: CreateClothesDto,
  ): Promise<Clothes> {
    return await this.clothesService.createClothes(createClothesDto);
  }

  // 기온 별 옷 조회
  @Get(':temp')
  getClothesByTemp(@Param('temp') temp: number): Promise<Clothes[] | number> {
    return this.clothesService.getClothesByTemp(temp);
  }

  // 특정 옷 수정
  @Patch(':id')
  async updateClothes(
    @Param('id') id: number,
    @Body() createClothesDto: CreateClothesDto,
  ): Promise<Clothes> {
    return await this.clothesService.updateClothes(id, createClothesDto);
  }

  // 특정 옷 삭제
  @Delete(':id')
  async deleteClothes(@Param('id') id: number): Promise<boolean> {
    return await this.clothesService.deleteClothes(id);
  }
}
