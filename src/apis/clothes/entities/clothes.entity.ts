import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 테이블 설정
@Entity('clothes')
export class Clothes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  category: string;

  @Column()
  name: string;

  @Column()
  startTemp: number;

  @Column()
  endTemp: number;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;
}
