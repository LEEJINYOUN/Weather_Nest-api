import { Bookmark } from 'src/apis/bookmarks/entities/bookmark.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 테이블 설정
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user, {
    eager: true,
  })
  bookmarks: Bookmark[];

  @CreateDateColumn()
  created_at: Date;
}
