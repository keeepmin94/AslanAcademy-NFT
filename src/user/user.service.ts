import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { DiscordAuth } from './discordAuth';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { UserDonateRepository } from './userDonate.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(UserDonateRepository)
    private userDonateRepository: UserDonateRepository,
    private auth: DiscordAuth,
    private jwtService: JwtService,
  ) {}

  async login(walletAddress: string): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findUser(walletAddress);

    if (user === null) {
      throw new NotFoundException(`Can't find User ${walletAddress}`);
    }

    const payload = { discordId: user.discordId };
    const accessToken = await this.jwtService.sign(payload);

    //토큰 발급
    return { accessToken: accessToken };
  }

  async authUser(authUserDto: AuthUserDto): Promise<{ accessToken: string }> {
    const { walletAddress, discordTag } = authUserDto;

    const member = await this.auth.searchMember(discordTag);
    if (member === null) {
      throw new NotFoundException(`Can't find User ${discordTag}`);
    }

    const user = this.userRepository.findOrCreateUser(
      member.id,
      walletAddress,
      discordTag,
    );

    const payload = { discordId: member.id };
    const accessToken = await this.jwtService.sign(payload);

    //토큰 발급
    return { accessToken: accessToken };
  }

  // async checkDonate(user: User): Promise<boolean> {

  // }

  async donate(donationAmount: number, user: User): Promise<void> {
    try {
      await this.userDonateRepository.donate(donationAmount, user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
