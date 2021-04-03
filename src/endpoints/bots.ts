import Bot, { BotData } from '../structures/bot'
import Endpoint from '../structures/endpoint'

/** Endpoint dos bots. */
export default class Bots extends Endpoint {
  /**
   * Busca por um bot na api.
   *
   * @param {string} id - O ID do bot.
   * @param {boolean} [fetchOwner=true] - Se o objeto do dono deve ser incluído.
   * @returns {Promise<Bot>} O bot requisitado.
   */
  async get (id: string, fetchOwner: boolean = true): Promise<Bot> {
    const data: BotData = await this.request('GET', `bots/${id}`)

    let owner
    if (fetchOwner) {
      owner = await this.client.users.get(data.owner)
    }

    return new Bot(data, owner)
  }
}
