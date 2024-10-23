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

  @ManyToOne(() => User, (user) => user.bookmarks, {
    eager: false,
  })
  user: User;

  @Column()
  locationKr: string;

  @Column()
  locationEn: string;

  @Column()
  imageNumber: number;

  @CreateDateColumn()
  created_at: Date;
}
