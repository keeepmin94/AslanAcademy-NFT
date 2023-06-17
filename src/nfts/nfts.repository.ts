import { Injectable } from '@nestjs/common';
import { NftCategory, NftPart } from './nfts.entity';
import { DataSource, Repository } from 'typeorm';

// Injectable();
export class NftCategoryRepository extends Repository<NftCategory> {
  // constructor(dataSource: DataSource) {
  //   super(NftCategory, dataSource.createEntityManager());
  // }
  async getAllNftParts(): Promise<NftCategory[]> {
    return await this.find();
  }
}
