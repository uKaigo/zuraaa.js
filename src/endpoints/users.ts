import Endpoint from '../structures/endpoint'
import User, { UserData } from '../structures/user'
import Bot, { BotData } from '../structures/bot'

/** Endpoint dos usuários. */
export default class Users extends Endpoint {
  /**
   * Busca por um usuário na api.
   *
   * @param {string} id - O ID do usuário.
   * @returns {Promise<User>} O usuário requisitado.
   */
  async get (id: string): Promise<User> {
    const data: UserData = await this.request('GET', `users/${id}`)

    return new User(data, this)
  }

  /**
   * Busca pelos bots do usuário.
   *
   * @param {string} id - O ID do usuário.
   * @param {boolean} [fetchOwner=true] - Se o objeto do dono deve ser incluído.
   * @returns {Promise<Bot[]>} Todos os bots do usuário.
   */
  async getBots (id: string, fetchOwner: boolean = true): Promise<Bot[]> {
    let owner: User
    if (fetchOwner) {
      owner = await this.get(id)
    }

    const data: BotData[] = await this.request('GET', `users/${id}/bots`)

    return data.map(bot => new Bot(bot, owner))
  }
}
