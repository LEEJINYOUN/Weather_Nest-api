import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 테이블 설정
@Entity('bookmarks')
export class Bookmark {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  locationKr: string;

  @Column()
  locationEn: string;

  @Column()
  imageNumber: number;

  @ManyToOne((type) => User, (user) => user.bookmarks, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
