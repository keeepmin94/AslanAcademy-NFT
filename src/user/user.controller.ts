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
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './entities/user.entity';
import { UserDonate } from './entities/userDonate.entity';

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

  @Post('/donate')
  @UseGuards(AuthGuard())
  donate(@GetUser() user: User, @Body('amount') amount: number): Promise<void> {
    return this.userService.donate(amount, user);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) //Req에 user넣어주기
  test(@GetUser() user: User) {
    console.log('user', user);
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
    @Body('combination') combination: string,
  ): Promise<void> {
    return this.userService.mint(combination, user);
  }
}
