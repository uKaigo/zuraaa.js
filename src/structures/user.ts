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

/** Representa um usuário do Zuraaa. */
export default class User {
  /** O ID do usuário. */
  id: string
  /** O nome do usuário. */
  name: string
  /** O discriminador do usuário. */
  discriminator: string
  /** O avatar do usuário. */
  avatar?: string
  /** Informações sobre as datas do usuário. */
  dates: UserDates
  /** Os detalhes sobre o usuário. */
  details: UserDetails
  /** A tag do usuário. */
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

  /**
   * Busca pelos bots do usuário.
   *
   * @returns {Promise<Bot[]>} Todos os bots do usuário.
   */
  async getBots (): Promise<Bot[]> {
    return await this.endpoint.getBots(this.id)
  }
}
