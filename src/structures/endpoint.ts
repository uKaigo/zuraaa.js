import centra from '@aero/centra'
import Client from '../client'
import { NotFound } from '../errors'

export default class Endpoint {
  protected BASE = 'https://www.zuraaa.com/api'
  protected client: Client

  constructor (client: Client) {
    this.client = client
  }

  protected async request (method: string, path: string): Promise<any> {
    const res = await centra(
      `${this.BASE}/${path}`,
      method.toUpperCase()
    ).send()
    if (res.statusCode === 404) throw new NotFound(res.json.message)

    return res.json
  }
}
