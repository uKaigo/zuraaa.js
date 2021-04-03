import Users from './endpoints/users'
import Bots from './endpoints/bots'

export interface ClientOptions {
  /** Número de elementos que serão salvos. */
  cacheSize?: number
}

/**
 * O cliente base para todas as requisições.
 *
 * @param {ClientOptions} [options] - As configurações
 * @param {number} [options.cacheSize=100] - Número de elementos que serão salvos em cache.
 */
export default class Client {
  /** Endpont de usuários. */
  users: Users
  /** Endpoint de bots. */
  bots: Bots

  constructor (options?: ClientOptions) {
    this.users = new Users(this, options?.cacheSize)
    this.bots = new Bots(this, options?.cacheSize)
  }
}
