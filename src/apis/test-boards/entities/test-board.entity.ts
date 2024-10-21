import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestBoardStatus } from './common/enums';

// 테이블 설정
@Entity('test-boards')
export class TestBoard {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TestBoardStatus })
  status: TestBoardStatus;

  @CreateDateColumn()
  created_at: Date;
}
