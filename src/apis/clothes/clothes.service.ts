import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clothes } from './entities/clothes.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import {
  IClothesServiceFindEndTemp,
  IClothesServiceFindOneByImage,
  IClothesServiceStore,
} from './interfaces/clothes-service.interface';

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

  // 옷 이름 체크
  findClothesImage({ image }: IClothesServiceFindOneByImage) {
    return this.clothesRepository.findOne({ where: { image } });
  }

  // 옷 등록
  async createClothes({
    category,
    name,
    startTemp,
    endTemp,
    image,
  }: IClothesServiceStore): Promise<Clothes> {
    // 등록된 옷 체크
    const isClothes = await this.findClothesImage({ image });

    // 일치하는 옷이 있는 경우
    if (isClothes) throw new ConflictException('이미 등록된 옷입니다.');

    // 옷 등록 성공
    return await this.clothesRepository.save({
      category,
      name,
      startTemp,
      endTemp,
      image,
    });
  }

  // 최저 기온 필터
  findClothesByStartTemp(temp: number) {
    return this.clothesRepository.find({
      where: { startTemp: LessThanOrEqual(temp) },
    });
  }

  // 최고 기온 필터
  findClothesByEndTemp({ temp, startClothes }: IClothesServiceFindEndTemp) {
    return startClothes.filter((item) => {
      return temp <= item.endTemp;
    });
  }

  // 기온 별 옷 조회
  async getClothesByTemp(temp: number) {
    // 최저 기온 필터
    const startClothes = await this.findClothesByStartTemp(temp);

    // 최고 기온 필터
    const endClothes = this.findClothesByEndTemp({ temp, startClothes });

    if (endClothes.length >= 1) {
      return endClothes;
    } else {
      return 0;
    }
  }
}
