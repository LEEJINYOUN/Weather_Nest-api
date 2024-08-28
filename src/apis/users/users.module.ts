import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from '../address/entities/address.entity';
import { AddressService } from '../address/address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Address, //
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AddressService],
  exports: [
    UsersService, //
  ],
})
export class UsersModule {}
