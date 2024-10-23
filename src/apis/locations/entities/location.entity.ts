import { Country } from 'src/apis/countries/entities/country.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 테이블 설정
@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  locationName: string;

  @ManyToOne(() => Country, (countries) => countries.locations, {
    eager: false,
  })
  countries: Country;

  @CreateDateColumn()
  created_at: Date;
}
