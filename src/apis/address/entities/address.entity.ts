import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 테이블 설정
@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // 1 : 1 조인 (주소와 유저)
  @JoinColumn() // 1 : 1 에만 필요
  @OneToOne(() => User, (user) => user.address, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  zip_code: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  addressDetail: string;

  @CreateDateColumn()
  created_at: Date;
}
