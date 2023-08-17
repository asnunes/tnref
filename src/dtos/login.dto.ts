import { IsNotEmpty, IsUrl } from 'class-validator';

export default class LoginDTO {
  @IsNotEmpty({ message: 'All fields are required!' })
  username: string;

  @IsNotEmpty({ message: 'All fields are required!' })
  @IsUrl()
  avatar: string;
}
