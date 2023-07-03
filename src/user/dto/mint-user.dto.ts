import { IsString, Length, Matches, IsNumberString } from 'class-validator';

export class MintUserDto {
  @IsString()
  @Length(8, 8)
  @IsNumberString()
  combination: string;

  @IsString()
  @Matches(/^http:\/\/.+$/, { message: 'imgUrl should start with http://' })
  imgUrl: string;
}
