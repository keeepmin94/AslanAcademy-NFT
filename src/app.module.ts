import { Module } from '@nestjs/common';
import { NftsModule } from './nfts/nfts.module';
import { UserModule } from './user/user.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    NftsModule,
    UserModule,
  ],
})
export class AppModule {}
