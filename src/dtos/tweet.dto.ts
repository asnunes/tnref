import { IsNotEmpty } from 'class-validator';

export default class CreateTweetDTO {
  @IsNotEmpty({ message: 'All fields are required!' })
  username: string;

  @IsNotEmpty({ message: 'All fields are required!' })
  tweet: string;
}
