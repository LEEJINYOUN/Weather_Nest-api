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
  userId: number;

  @Column()
  locationKr: string;

  @Column()
  locationEn: string;

  @Column()
  imageNumber: number;

  @CreateDateColumn()
  created_at: Date;
}
