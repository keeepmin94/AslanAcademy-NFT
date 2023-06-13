import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DiscordAuth } from './discordAuth';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDonate } from './userDonate.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserDonateRepository } from './userDonate.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Aslan1234',
      signOptions: { expiresIn: 60 * 60 },
    }),
    TypeOrmModule.forFeature([User, UserDonate]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserDonateRepository,
    DiscordAuth,
    JwtStrategy,
  ],
})
export class UserModule {}
