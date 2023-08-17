import User from './user.model';

export default class Tweet {
  private _user: User;
  private _tweet: string;

  constructor(user: User, tweet: string) {
    this._user = user;
    this._tweet = tweet;
  }

  get user() {
    return this._user;
  }

  get tweet() {
    return this._tweet;
  }
}
