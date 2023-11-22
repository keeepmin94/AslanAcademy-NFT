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
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: '로그인 API',
    description:
      '메타마스크 지갑 로그인 후 지갑 주소를 이용하여 로그인 합니다. 로그인 후 JWT토큰이 발급됩니다.',
  })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    description: '지갑주소',
  })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'InternalServerError.' })
  @Get('/login')
  logIn(
    @Query('walletAddress') walletAddress: string,
  ): Promise<{ accessToken: string }> {
    console.log(walletAddress);
    return this.userService.login(walletAddress);
  }

  @ApiOperation({
    summary: '디스코드 인증',
    description:
      'DB에 유저 정보가 없을시 디스코드 인증을 통해 아슬란 디스코드 유저인지 판단합니다. 지갑 로그인이 된 상태에서 가능합니다.',
  })
  @ApiResponse({ status: 201, description: 'success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'InternalServerError.' })
  @Post('/auth')
  createUser(
    @Body(ValidationPipe) authUserDto: AuthUserDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.authUser(authUserDto);
  }

  @ApiOperation({
    summary: '기부 확인',
    description:
      '요청한 유저의 기부 내역을 확인합니다. 기부한 유저는 특수 파츠를 장착할 수 있습니다.',
  })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 500, description: 'InternalServerError.' })
  @Get('/isDonate')
  @UseGuards(AuthGuard())
  checkDonate(@GetUser() user: User): Promise<{ available: boolean }> {
    return this.userService.checkDonate(user);
  }

  @Get('/enable')
  @UseGuards(AuthGuard())
  enable(): Promise<void> {
    return;
  }

  @ApiOperation({
    summary: '기부',
    description:
      '기부한 유저들들 기록합니다. 기부한 유저는 특수 파츠를 장착할 수 있습니다.',
  })
  @ApiBody({ required: true, description: '기부 금액', type: Number })
  @ApiResponse({ status: 201, description: 'success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'InternalServerError.' })
  @Post('/donate')
  @UseGuards(AuthGuard())
  donate(@GetUser() user: User, @Body('amount') amount: number): Promise<void> {
    return this.userService.donate(amount, user);
  }

  @ApiOperation({
    summary: '민팅 조합 중복 체크',
    description:
      '유저가 조합한 민팅 조합이 존재하는지 체크합니다. 이미 다른 유저가 해당 조합으로 민팅한 경우 민팅이 불가능합니다. 중복 조합 없으면 true 응답, 이미 있을시 false 응답',
  })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 500, description: 'InternalServerError.' })
  @Get('/checkOverlap')
  checkOverlap(
    @Query('combination') combination: string,
  ): Promise<{ available: boolean }> {
    return this.userService.checkOverlap(combination);
  }

  @ApiOperation({
    summary: '민팅 등록',
    description: '민팅시 유저의 민팅 조합 저장합니다',
  })
  @ApiResponse({ status: 201, description: 'success' })
  @ApiResponse({ status: 500, description: 'InternalServerError.' })
  @Post('/mint')
  @UseGuards(AuthGuard())
  mint(
    @GetUser() user: User,
    @Body(ValidationPipe) mintUserDto: MintUserDto,
  ): Promise<void> {
    console.log(mintUserDto);
    return this.userService.mint(mintUserDto, user);
  }

  @ApiOperation({
    summary: '모든 유저들 NFT이미지',
    description: '모든 유저들의 NFT이미지를 불러옵니다.',
  })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 500, description: 'InternalServerError.' })
  @Get('/usersNft')
  getAllUsersNft(): Promise<NftCombination[]> {
    return this.userService.getAllUsersNft();
  }

  @ApiOperation({
    summary: '유저들 NFT이미지',
    description:
      '메인 페이지를 위한 유저들 NFT 이미지입니다. 최근 상위 10개를 불러옵니다',
  })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 500, description: 'InternalServerError.' })
  @Get('/nftMain')
  getNftsMain(): Promise<NftCombination[]> {
    return this.userService.getNftsMain();
  }

  @ApiOperation({
    summary: '나의 NFT이미지',
    description: '자신의 NFT 정보를 불러옵니다',
  })
  @Get('/userNft')
  @UseGuards(AuthGuard())
  getUserNft(@GetUser() user: User): Promise<NftCombination> {
    return this.userService.getUserNft(user);
  }
}
