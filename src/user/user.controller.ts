import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  logIn(
    @Body('walletAddress') walletAddress: string,
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

  // @Get('/isdonate')
  // @UseGuards(AuthGuard())
  // checkDonate(@GetUser() user: User): Promise<boolean> {
  //   return false;
  // }

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
}
