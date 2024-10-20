import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothes } from './entities/clothes.entity';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Clothes, //
    ]),
  ],
  controllers: [ClothesController],
  providers: [ClothesService],
})
export class ClothesModule {}
