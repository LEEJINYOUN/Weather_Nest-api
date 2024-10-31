import { ApiProperty } from '@nestjs/swagger';

export class CreateClothesDto {
  @ApiProperty({ description: '카테고리', default: 'string' })
  category: string;

  @ApiProperty({ description: '이름', default: 'string' })
  name: string;

  @ApiProperty({ description: '시작 기온', default: 'number' })
  startTemp: number;

  @ApiProperty({ description: '끝 기온', default: 'number' })
  endTemp: number;

  @ApiProperty({ description: '이미지', default: 'string' })
  image: string;
}
