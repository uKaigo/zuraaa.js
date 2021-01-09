export interface BotDates {
  sent: string
}

export interface BotDetails {
  tags: string[]
  otherOwners: string[]
  prefix: string
  customInviteLink: string
  library: string
  shortDescription: string
  longDescription?: string
  htmlDescription: string
  website: string
  supportServer: string
  customURL?: string
}

export interface BotVotes {
  current: number
  voteslog: string[]
}

export interface BotData {
  _id: string
  owner: string
  username: string
  discriminator: string
  avatar?: string
  status: string
  dates: BotDates
  details: BotDetails
  votes: BotVotes
}

export default class Bot {
  id: string
  owner: string
  username: string
  discriminator: string
  tag: string
  avatar?: string
  status: string
  dates: BotDates
  details: BotDetails
  votes: BotVotes

  constructor (data: BotData) {
    this.id = data._id
    this.owner = data.owner
    this.username = data.username
    this.discriminator = data.discriminator
    this.tag = `${this.username}#${this.discriminator}`
    this.status = data.status
    this.dates = data.dates
    this.details = data.details
    this.votes = data.votes
  }
}
