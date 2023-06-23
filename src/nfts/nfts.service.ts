import { Injectable } from '@nestjs/common';
import { NftCategory } from './nfts.entity';
//import { NftCategoryRepository } from './nfts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NftsService {
  constructor(
    @InjectRepository(NftCategory)
    private nftCategoryRepository: Repository<NftCategory>,
  ) {}

  async getAllNftParts(): Promise<NftCategory[]> {
    //return this.nftCategoryRepository.getAllNftParts(); //custom repository 에러 해결 못해서 typeORM repository 사용
    return await this.nftCategoryRepository.find();
  }
}
