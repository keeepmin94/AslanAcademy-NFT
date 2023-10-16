import { Controller, Get } from '@nestjs/common';
import { NftCategory, NftPart } from './nfts.entity';
import { NftsService } from './nfts.service';

@Controller('nfts')
export class NftsController {
  constructor(private nftsService: NftsService) {}
  @Get('getParts')
  getAllNFTParts(): Promise<NftCategory[]> {
    return this.nftsService.getAllNftParts();
  }

  @Get('test')
  getTest(): { message: string } {
    return { message: 'Welcome Aslan!' };
  }
}
