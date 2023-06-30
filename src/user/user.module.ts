import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DiscordAuth } from './discordAuth';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDonate } from './entities/userDonate.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { NftCombination } from './entities/nftsCombination.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: 60 * 60 },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, UserDonate, NftCombination]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, DiscordAuth, JwtStrategy],
})
export class UserModule {}
