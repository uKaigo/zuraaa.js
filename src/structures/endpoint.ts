import centra from '@aero/centra'
import Client from '../client'
import HTTPCache from '../utils/cache'
import { NotFound } from '../errors'

export default class Endpoint {
  protected BASE = 'https://api.zuraaa.com'
  protected client: Client
  protected cache: HTTPCache

  constructor (client: Client, cacheSize?: number) {
    this.client = client
    this.cache = new HTTPCache(cacheSize)
  }

  protected async request (method: string, path: string): Promise<any> {
    const key = `${method}${path}`
    const cached = this.cache.get(key)

    const res =
      cached ||
      (await centra(`${this.BASE}/${path}`, method.toUpperCase())
        .header('User-Agent', 'zuraaa.js (https://github.com/uKaigo/zuraaa.js)')
        .header('X-Powered-By', 'NodeJS | @aero/centra')
        .send())

    this.cache.insert(key, res) // Fazer o cache do request para permitir erros.

    if (res.statusCode === 404) throw new NotFound(res.json.message)

    return res.json
  }
}
