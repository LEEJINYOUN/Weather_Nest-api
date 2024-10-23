import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bookmark, //
      User,
    ]),
    UsersModule,
  ],
  controllers: [BookmarksController],
  providers: [BookmarksService, UsersService],
})
export class BookmarksModule {}
