import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clothes } from './entities/clothes.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CreateClothesDto } from './dto/create-clothes.dto';

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

  // 옷 등록
  async createClothes(createClothesDto: CreateClothesDto): Promise<Clothes> {
    const { category, name, startTemp, endTemp, image } = createClothesDto;

    // 1. 등록된 옷 체크
    const isClothes = await this.clothesRepository.findOne({
      where: { image },
    });

    // 2. 일치하는 옷이 있는 경우
    if (isClothes) throw new ConflictException('이미 등록된 옷입니다.');

    // 3. 옷 등록 성공
    return await this.clothesRepository.save({
      category,
      name,
      startTemp,
      endTemp,
      image,
    });
  }

  // 기온 별 옷 조회
  async getClothesByTemp(temp: number): Promise<Clothes[] | number> {
    // 1. 최저 기온 필터
    const startClothes = await this.clothesRepository.find({
      where: { startTemp: LessThanOrEqual(temp) },
    });

    // 2. 최고 기온 필터
    const endClothes = startClothes.filter((item) => {
      return temp <= item.endTemp;
    });

    if (endClothes.length >= 1) {
      return endClothes;
    } else {
      return 0;
    }
  }

  // 특정 옷 수정
  async updateClothes(
    id: number,
    createClothesDto: CreateClothesDto,
  ): Promise<Clothes> {
    // 1. id로 옷 조회
    const clothes = await this.clothesRepository.findOne({
      where: { id },
    });

    Object.assign(clothes, createClothesDto);

    return await this.clothesRepository.save(clothes);
  }

  // 특정 옷 삭제
  async deleteClothes(id: number): Promise<boolean> {
    const result = await this.clothesRepository.delete({ id });
    return result.affected ? true : false;
  }
}
