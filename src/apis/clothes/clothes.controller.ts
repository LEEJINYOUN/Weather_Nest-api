import { Controller, Get } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { Clothes } from './entities/clothes.entity';

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  // 모든 옷 조회
  @Get('all')
  getLocations(): Promise<Clothes[]> {
    return this.clothesService.getClothes();
  }
}
