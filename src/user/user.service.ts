import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { MintUserDto } from './dto/mint-user.dto';
import { DiscordAuth } from './discordAuth';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserDonate } from './entities/userDonate.entity';
import { Repository } from 'typeorm';
import { NftCombination } from './entities/nftsCombination.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(UserDonate)
    private userDonateRepository: Repository<UserDonate>,
    @InjectRepository(NftCombination)
    private nftsCombinationRepository: Repository<NftCombination>,
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
      throw new NotFoundException(
        `${discordTag} User doesn't exist on our Discord server. `,
      );
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
      const userDonates = await this.userDonateRepository.find({
        where: { user: { id: user.id } },
      });
      if (userDonates === null)
        throw new NotFoundException(`Can't find Users donations'`);

      return userDonates;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async donate(donationAmount: number, user: User): Promise<void> {
    try {
      await this.userDonateRepository.save({ donationAmount, user });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async checkOverlap(combination: string): Promise<{ available: boolean }> {
    // try {
    //   const com = await this.nftsCombinationRepository.findOne({
    //     where: { combination: combination },
    //   });
    //   console.log(com);
    //   if (com) {
    //     console.log('있음');
    //     throw new Error('중복된 ID가 이미 존재합니다.');
    //   }
    // } catch (error) {
    //   throw new HttpException(
    //     { message: error.message, code: HttpStatus.CONFLICT },
    //     HttpStatus.CONFLICT,
    //   );
    // }
    try {
      const com = await this.nftsCombinationRepository.findOne({
        where: { combination: combination },
      });
      //console.log(com);
      if (com) {
        console.log('있음');
        return { available: false };
      }

      return { available: true };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async mint(mintUserDto: MintUserDto, user: User): Promise<void> {
    const { combination, imgUrl } = mintUserDto;
    try {
      await this.nftsCombinationRepository.save({
        combination: combination,
        imgUrl: imgUrl,
        user: user,
      });
      console.log(combination, imgUrl);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getUsersNft(): Promise<NftCombination[]> {
    try {
      return await this.nftsCombinationRepository.find({
        select: {
          id: true,
          combination: true,
          imgUrl: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
