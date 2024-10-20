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
  countryId: number;

  @Column({ unique: true })
  locationName: string;

  @CreateDateColumn()
  created_at: Date;
}
