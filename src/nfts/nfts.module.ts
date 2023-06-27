import { Module } from '@nestjs/common';
import { NftsController } from './nfts.controller';
import { NftsService } from './nfts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftCategory, NftPart } from './nfts.entity';
import { NftCategoryRepository } from './nfts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NftCategory, NftPart])],
  controllers: [NftsController],
  providers: [NftsService, NftCategoryRepository],
})
export class NftsModule {}
