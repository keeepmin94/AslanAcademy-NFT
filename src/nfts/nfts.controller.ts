import { Controller, Get } from '@nestjs/common';

@Controller('nfts')
export class NftsController {
  @Get()
  getNFTParts(): string {
    return 'Test';
  }
}
