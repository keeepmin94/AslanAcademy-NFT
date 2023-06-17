import { Controller, Get } from '@nestjs/common';
import { NftCategory, NftPart } from './nfts.entity';
import { NftsService } from './nfts.service';

@Controller('nfts')
export class NftsController {
  constructor(private nftsService: NftsService) {}
  @Get()
  getAllNFTParts(): Promise<NftCategory[]> {
    return this.nftsService.getAllNftParts();
  }
}
