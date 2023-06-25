import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class NftCombination extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 8 })
  combination: string;

  @OneToOne((type) => User, (user) => user.userNft, { eager: false })
  user: User;
}
