import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import CreateTweetDTO from './dtos/tweet.dto';
import LoginDTO from './dtos/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHealth(): string {
    return "I'm okay!";
  }

  @Get('tweets')
  getTweets(@Query('page') page: number = undefined) {
    if (page && (isNaN(page) || page <= 0)) {
      throw new HttpException('Invalid page value', HttpStatus.BAD_REQUEST);
    }

    return this.appService.getTweets(page);
  }

  @Get('tweets/:username')
  getTweetsFromUsername(@Param('username') username: string) {
    return this.appService.getTweetsFromUser(username);
  }

  @Post('tweets')
  createTweet(@Body() tweetDTO: CreateTweetDTO) {
    try {
      return this.appService.createTweet(tweetDTO);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() loginDTO: LoginDTO) {
    return this.appService.login(loginDTO);
  }
}
