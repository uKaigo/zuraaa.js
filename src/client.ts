import Users from './endpoints/users'
import Bots from './endpoints/bots'

export interface ClientOptions {
  cacheSize?: number
}

export default class Client {
  users: Users
  bots: Bots

  constructor (options?: ClientOptions) {
    this.users = new Users(this, options?.cacheSize)
    this.bots = new Bots(this, options?.cacheSize)
  }
}
