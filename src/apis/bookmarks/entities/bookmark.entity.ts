import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 테이블 설정
@Entity('bookmarks')
export class Bookmark {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

  @Column()
  location_kr: string;

  @Column()
  location_en: string;

  @CreateDateColumn()
  created_at: Date;
}
