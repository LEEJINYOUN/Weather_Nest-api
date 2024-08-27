import { Address } from 'src/apis/address/entities/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 테이블 설정
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  // 1 : 1 조인 (유저와 주소)
  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @CreateDateColumn()
  created_at: Date;
}
