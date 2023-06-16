import { IsString, Length, Matches } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @Length(42)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: `wallet address only accepts english and number`,
  })
  walletAddress: string;

  // @IsString()
  // @Matches(/.+#[0-9]{4}$/, {
  //   // /^[A-Za-zㄱ-ㅎ가-힣0-9].*#[0-9]{4}$/
  //   message: `Discord ID format was entered incorrectly`,
  // })
  @IsString()
  discordTag: string;
}
