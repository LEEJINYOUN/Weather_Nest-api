import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 테이블 설정
@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  location_kr: string;

  @Column()
  location_en: string;

  @CreateDateColumn()
  created_at: Date;
}
