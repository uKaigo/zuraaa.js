import Bot, { BotData } from '../structures/bot'
import Endpoint from '../structures/endpoint'

export default class Bots extends Endpoint {
  async get (id: string, fetchOwner = true) {
    const data: BotData = await this.request('GET', `bots/${id}`)

    let owner
    if (fetchOwner) {
      owner = await this.client.users.get(data.owner)
    }

    return new Bot(data, owner)
  }
}
