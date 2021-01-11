import Bot from './bot'
import Users from '../endpoints/users'

export interface UserDetails {
  description: string
  role?: number
}

export interface UserDates {
  firstSeen: string
  lastBotAdd: string
  nextVote: string
}

export interface UserData {
  _id: string
  username: string
  discriminator: string
  avatar?: string
  dates: UserDates
  details: UserDetails
}

export default class User {
  id: string
  name: string
  discriminator: string
  avatar?: string
  dates: UserDates
  details: UserDetails
  tag: string
  private endpoint: Users

  constructor (data: UserData, endpoint: Users) {
    this.id = data._id
    this.name = data.username
    this.discriminator = data.discriminator
    this.tag = `${this.name}#${this.discriminator}`
    this.avatar = data.avatar
    this.dates = data.dates
    this.details = data.details

    this.endpoint = endpoint
  }

  async getBots (): Promise<Bot[]> {
    return await this.endpoint.getBots(this.id)
  }
}
