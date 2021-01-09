import Bot, { BotData } from '../structures/bot'
import Endpoint from '../structures/endpoint'

export default class Bots extends Endpoint {
  async get (id: string) {
    const data: BotData = await this.request('GET', `bots/${id}`)

    return new Bot(data)
  }
}
