import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { DiscordAuth } from './discordAuth';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UserDonate } from './entities/userDonate.entity';
import { UserDonateRepository } from './repositories/userDonate.repository';

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

    await this.userRepository.findOrCreateUser(
      member.id,
      walletAddress,
      member.user.username,
    );

    const payload = { discordId: member.id };
    const accessToken = await this.jwtService.sign(payload);

    //토큰 발급
    return { accessToken: accessToken };
  }

  async checkDonate(user: User): Promise<UserDonate[]> {
    try {
      const userDonates = await this.userDonateRepository.checkDonate(user);
      if (userDonates === null)
        throw new NotFoundException(`Can't find Users donations'`);

      return userDonates;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async donate(donationAmount: number, user: User): Promise<void> {
    try {
      await this.userDonateRepository.donate(donationAmount, user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
