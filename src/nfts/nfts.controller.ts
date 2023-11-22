import { Controller, Get } from '@nestjs/common';
import { NftCategory, NftPart } from './nfts.entity';
import { NftsService } from './nfts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('NFT')
@Controller('nfts')
export class NftsController {
  constructor(private nftsService: NftsService) {}
  @ApiOperation({
    summary: 'nft 파츠 목록 가져오기',
    description: '모든 NFT의 파츠 정보들을 불러옵니다.',
  })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 500, description: 'InternalServerError.' })
  @Get('getParts')
  getAllNFTParts(): Promise<NftCategory[]> {
    return this.nftsService.getAllNftParts();
  }

  @Get('test')
  getTest(): { message: string } {
    return { message: 'Welcome Aslan!' };
  }
}
