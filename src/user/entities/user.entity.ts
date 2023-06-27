import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserDonate } from './userDonate.entity';
import { NftCombination } from 'src/user/entities/nftsCombination.entity';

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
    eager: false,
  })
  userDonates: UserDonate[];

  @JoinColumn()
  @OneToOne((type) => NftCombination, (userNft) => userNft.user, {
    eager: false,
  })
  userNft: NftCombination;
}
