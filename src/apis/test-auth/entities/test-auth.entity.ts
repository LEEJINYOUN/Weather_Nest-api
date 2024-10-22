import { TestBoard } from 'src/apis/test-boards/entities/test-board.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 테이블 설정
@Entity('test-auth')
export class TestAuth extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => TestBoard, (testBoard) => testBoard.testAuth, {
    eager: true,
  })
  testBoards: TestBoard[];

  @CreateDateColumn()
  created_at: Date;
}
