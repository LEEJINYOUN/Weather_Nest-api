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
  async getClothes(): Promise<Clothes[]> {
    return await this.clothesService.getClothes();
  }

  // 옷 등록
  @Post('create')
  async createClothes(
    @Body() createClothesDto: CreateClothesDto,
  ): Promise<Clothes> {
    return await this.clothesService.createClothes({
      category: createClothesDto.category,
      name: createClothesDto.name,
      startTemp: createClothesDto.startTemp,
      endTemp: createClothesDto.endTemp,
      image: createClothesDto.image,
    });
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
