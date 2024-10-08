import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { Clothes } from './entities/clothes.entity';
import { CreateClothesInput } from './dto/create-clothes.input';

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

  // 특정 지역명 번호로 조회
  @Get(':temp')
  getClothesByTemp(@Param('temp') temp: number): Promise<any> {
    return this.clothesService.getClothesByTemp(temp);
  }
}
