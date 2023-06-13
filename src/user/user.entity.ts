import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { UserDonate } from './userDonate.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  walletAddress: string;

  @Column()
  discordId: string;

  @Column()
  discordTag: string;

  @CreateDateColumn()
  createAt: Date;

  @OneToMany((type) => UserDonate, (userDonate) => userDonate.user, {
    eager: true,
  })
  userDonates: UserDonate[];
}
