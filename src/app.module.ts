import { Module } from '@nestjs/common';
import { NftsModule } from './nfts/nfts.module';
import { UserModule } from './user/user.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), NftsModule, UserModule],
})
export class AppModule {}
