import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class NftCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  idPosition: number;

  @Column()
  layerPosition: number;

  @OneToMany((type) => NftPart, (nftPart) => nftPart.nftCategory, {
    eager: true,
  })
  nftParts: NftPart[];
}

@Entity()
export class NftPart extends BaseEntity {
  @PrimaryGeneratedColumn()
  partId: number;

  @Column()
  value: string;

  @Column()
  paid: boolean;

  @Column()
  imageUrl: string;

  @ManyToOne((type) => NftCategory, (nftCategory) => nftCategory.nftParts, {
    eager: false,
  })
  nftCategory: NftCategory;
}
