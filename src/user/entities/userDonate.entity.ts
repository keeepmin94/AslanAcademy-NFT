import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserDonate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 6, scale: 2 })
  donationAmount: number;

  @CreateDateColumn()
  createAt: Date;

  @ManyToOne((type) => User, (user) => user.userDonates, { eager: false })
  user: User;
}
