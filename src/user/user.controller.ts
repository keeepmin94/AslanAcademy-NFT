import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
  Req,
  Query,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { MintUserDto } from './dto/mint-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './entities/user.entity';
import { UserDonate } from './entities/userDonate.entity';
import { NftCombination } from './entities/nftsCombination.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/login')
  logIn(
    @Query('walletAddress') walletAddress: string,
  ): Promise<{ accessToken: string }> {
    console.log(walletAddress);
    return this.userService.login(walletAddress);
  }

  @Post('/auth')
  createUser(
    @Body(ValidationPipe) authUserDto: AuthUserDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.authUser(authUserDto);
  }

  @Get('/isDonate')
  @UseGuards(AuthGuard())
  checkDonate(@GetUser() user: User): Promise<UserDonate[]> {
    return this.userService.checkDonate(user);
  }

  @Get('/enable')
  @UseGuards(AuthGuard())
  enable(): Promise<void> {
    return;
  }

  @Post('/donate')
  @UseGuards(AuthGuard())
  donate(@GetUser() user: User, @Body('amount') amount: number): Promise<void> {
    return this.userService.donate(amount, user);
  }

  @Get('/checkOverlap')
  checkOverlap(
    @Query('combination') combination: string,
  ): Promise<{ available: boolean }> {
    return this.userService.checkOverlap(combination);
  }

  @Post('/mint')
  @UseGuards(AuthGuard())
  mint(
    @GetUser() user: User,
    @Body(ValidationPipe) mintUserDto: MintUserDto,
  ): Promise<void> {
    console.log(mintUserDto);
    return this.userService.mint(mintUserDto, user);
  }

  @Get('/usersNft')
  getAllUsersNft(): Promise<NftCombination[]> {
    return this.userService.getAllUsersNft();
  }

  @Get('/nftMain')
  getNftsMain(): Promise<NftCombination[]> {
    return this.userService.getNftsMain();
  }

  @Get('/userNft')
  @UseGuards(AuthGuard())
  getUserNft(@GetUser() user: User): Promise<NftCombination> {
    return this.userService.getUserNft(user);
  }
}
