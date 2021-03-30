import { EventEmitter } from 'events'
import { createServer, Server, IncomingMessage, ServerResponse } from 'http'

interface WebhookOptions {
  emitter: EventEmitter
  port: number
  auth: string
}

export class Webhook extends EventEmitter {
  protected _auth?: string
  protected _server: Server | null
  emitter?: EventEmitter
  port: number

  constructor (options?: WebhookOptions) {
    super()
    this.emitter = options?.emitter
    this.port = options?.port ?? 8080
    this._auth = options?.auth

    this._server = null
  }

  start () {
    this._server = createServer(this._handleReq.bind(this))
    this._server.listen(this.port)
    this._server.once('listening', this._dispatchReady.bind(this))
    this._server.on('error', this._handleServerError.bind(this))
  }

  close () {
    this._server?.close()
  }

  protected _handleServerError (err: any) {
    switch (err.code) {
      case 'EADDRINUSE':
        this.emit('error', {
          type: 'ERRADDRINUSE',
          port: this.port,
          message: `A porta ${this.port} está sendo usada por outro processo.`
        })
        break
      case 'EACCES':
        this.emit('error', {
          type: 'EACCES',
          port: this.port,
          message: `A porta ${this.port} requer privilégios administrativos.`
        })
        break
      default:
        this.emit('error', {
          type: err.code,
          port: this.port,
          message: null
        })
    }
  }

  protected _dispatchReady () {
    this.emit('ready', this.port)
  }

  protected _handleReq (req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'POST') return this._sendStatus(res, 405)

    if (this._auth && this._auth !== req.headers.authorization) {
      return this._sendStatus(res, 403)
    }

    let data: any = ''
    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      if (!data) return this._sendStatus(res, 400)

      try {
        data = JSON.parse(data)
      } catch (err) {
        return this._sendStatus(res, 400)
      }
      if (!data.data || !data.type) return this._sendStatus(res, 400)
      if (data.type !== 'vote') return this._sendStatus(res, 418)

      this.emit('vote', data.data)
      if (this.emitter) {
        this.emitter.emit('zuraaaVote', data.data)
      }

      this._sendStatus(res, 200)
    })
  }

  protected _sendStatus (res: ServerResponse, status: number) {
    res.statusCode = status
    res.end()
  }
}
