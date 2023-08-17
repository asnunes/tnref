import { Injectable } from '@nestjs/common';
import Tweet from './entities/tweet.model';
import User from './entities/user.model';
import CreateTweetDTO from './dtos/tweet.dto';
import LoginDTO from './dtos/login.dto';

@Injectable()
export class AppService {
  private LIMIT = 15;

  private tweets: Tweet[];
  private users: User[];

  constructor() {
    this.tweets = [];
    this.users = [];
  }

  getTweets(page?: number) {
    let tweets: Tweet[] = [];
    if (page) {
      const { start, end } = this.calculatePageLimits(page);
      tweets = this.tweets.slice(start, end);
    } else {
      tweets = this.tweets.slice(-this.LIMIT);
    }

    return this.formatTweets(tweets);
  }

  getTweetsFromUser(username: string) {
    const filteredTweets = this.tweets.filter(
      (tweet) => tweet.user.username === username,
    );
    return this.formatTweets(filteredTweets);
  }

  createTweet(tweetDTO: CreateTweetDTO) {
    const { username, tweet } = tweetDTO;
    const user = this.getUserByUsername(username);
    if (!user) throw new Error('User does not exist!');

    return this.tweets.push(new Tweet(user, tweet));
  }

  login(loginDTO: LoginDTO) {
    const { username, avatar } = loginDTO;
    return this.users.push(new User(username, avatar));
  }

  private formatTweets(tweets: Tweet[]) {
    return tweets.map((tweet) => {
      const { username, avatar } = tweet.user;
      return {
        username,
        avatar,
        tweet: tweet.tweet,
      };
    });
  }

  private getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  private calculatePageLimits(page: number) {
    return {
      start: (page - 1) * this.LIMIT,
      end: page * this.LIMIT,
    };
  }
}
