import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Location } from './entities/location.entity';
import { CountriesModule } from '../countries/countries.module';
import { Country } from '../countries/entities/country.entity';
import { CountriesService } from '../countries/countries.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Location, //
      Country, //
    ]),
    CountriesModule, //
  ],

  controllers: [LocationsController],
  providers: [
    LocationsService, //
    CountriesService, //
  ],
})
export class LocationsModule {}
