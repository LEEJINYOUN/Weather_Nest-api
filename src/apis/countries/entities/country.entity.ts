import { Location } from 'src/apis/locations/entities/location.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 테이블 설정
@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Location, (location) => location.countries, {
    eager: true,
  })
  locations: Location[];

  @CreateDateColumn()
  created_at: Date;
}
