import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clothes } from './entities/clothes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClothesService {
  constructor(
    @InjectRepository(Clothes)
    private readonly clothesRepository: Repository<Clothes>,
  ) {}

  // 모든 옷 조회
  getClothes(): Promise<Clothes[]> {
    return this.clothesRepository.find();
  }
}
