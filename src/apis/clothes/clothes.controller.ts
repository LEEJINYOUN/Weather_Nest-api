import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { Clothes } from './entities/clothes.entity';
import { CreateClothesInput } from './dto/create-clothes.input';

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
    @Body() createClothesInput: CreateClothesInput,
  ): Promise<Clothes> {
    return await this.clothesService.createClothes({
      category: createClothesInput.category,
      name: createClothesInput.name,
      startTemp: createClothesInput.startTemp,
      endTemp: createClothesInput.endTemp,
      image: createClothesInput.image,
    });
  }

  // 기온 별 옷 조회
  @Get(':temp')
  getClothesByTemp(@Param('temp') temp: number): Promise<Clothes[] | number> {
    return this.clothesService.getClothesByTemp(temp);
  }

  // 특정 옷 수정
  @Put(':id')
  async updateClothes(
    @Param('id') id: number,
    @Body() createClothesInput: CreateClothesInput,
  ): Promise<Clothes> {
    return await this.clothesService.updateClothes(id, createClothesInput);
  }

  // 특정 옷 삭제
  @Delete(':id')
  async deleteClothes(@Param('id') id: number): Promise<boolean> {
    return await this.clothesService.deleteClothes(id);
  }
}
