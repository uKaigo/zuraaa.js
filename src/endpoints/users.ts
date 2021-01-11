import Endpoint from '../structures/endpoint'
import User, { UserData } from '../structures/user'
import Bot, { BotData } from '../structures/bot'

export default class Users extends Endpoint {
  async get (id: string) {
    const data: UserData = await this.request('GET', `users/${id}`)

    return new User(data, this)
  }

  async getBots (id: string, fetchOwner = true) {
    let owner: User
    if (fetchOwner) {
      owner = await this.get(id)
    }

    const data: BotData[] = await this.request('GET', `users/${id}/bots`)

    return data.map(bot => new Bot(bot, owner))
  }
}
