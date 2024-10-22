import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestBoardStatus } from './common/enums';
import { TestAuth } from 'src/apis/test-auth/entities/test-auth.entity';

// 테이블 설정
@Entity('test-boards')
export class TestBoard extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TestBoardStatus })
  status: TestBoardStatus;

  @ManyToOne((type) => TestAuth, (testAuth) => testAuth.testBoards, {
    eager: false,
  })
  testAuth: TestAuth;

  @CreateDateColumn()
  created_at: Date;
}
