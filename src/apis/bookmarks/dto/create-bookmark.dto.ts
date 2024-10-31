import { ApiProperty } from '@nestjs/swagger';

export class CreateBookmarkDto {
  @ApiProperty({ description: '지역 한글명', default: 'string' })
  locationKr: string;

  @ApiProperty({ description: '지역 영문명', default: 'string' })
  locationEn: string;

  @ApiProperty({ description: '이미지 번호', default: 'number' })
  imageNumber: number;
}
