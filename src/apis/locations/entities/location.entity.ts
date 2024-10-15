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
  country_id: number;

  @Column({ unique: true })
  location: string;

  @CreateDateColumn()
  created_at: Date;
}
