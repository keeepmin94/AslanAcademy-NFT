import { Module } from '@nestjs/common';
import { NftsModule } from './nfts/nfts.module';
import { UserModule } from './user/user.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'file'),
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    NftsModule,
    UserModule,
  ],
})
export class AppModule {}
