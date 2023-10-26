import { IsString, Length, Matches, IsNumberString } from 'class-validator';

export class MintUserDto {
  @IsString()
  @Length(12, 12)
  @IsNumberString()
  combination: string;

  @IsString()
  @Matches(/^http:\/\/.+$/, { message: 'imgUrl should start with http://' })
  imgUrl: string;
}
