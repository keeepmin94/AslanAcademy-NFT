import { IsString, Length, Matches } from 'class-validator';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class AuthUserDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '지갑 주소',
    example: '0xf1DDF8a3B9f86aF120C4f7E5AdA662975336C9Bd',
  })
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
  @ApiProperty({
    required: true,
    type: String,
    description: '디스코드 사용자명',
    example: 'jiumin94',
  })
  @IsString()
  discordTag: string;
}
