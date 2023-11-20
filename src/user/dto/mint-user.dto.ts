import { IsString, Length, Matches, IsNumberString } from 'class-validator';

export class MintUserDto {
  @IsString()
  @Length(11, 11)
  @IsNumberString()
  combination: string;

  @IsString()
  @Matches(/^https:\/\/.+$/, { message: 'imgUrl should start with https://' })
  imgUrl: string;
}
