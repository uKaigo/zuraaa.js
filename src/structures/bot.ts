import User from './user'

export interface BotDates {
  /** Quando o bot foi enviado. */
  sent: string
  /** Quando o bot foi aprovado. */
  approved: string
}

export interface BotDetails {
  /** As tags do bot. */
  tags: string[]
  /** Outros donos do bot. */
  otherOwners: string[]
  /** O prefixo do bot. */
  prefix: string
  /** O link de convite do bot. */
  customInviteLink: string
  /** A biblioteca que o bot foi feito. */
  library: string
  /** A descrição curta do bot. */
  shortDescription: string
  /** A descrição longa do bot. */
  longDescription?: string
  // Imagino que seja a descrição longa também mas não tenho certeza.
  htmlDescription: string
  /** O website do bot. */
  website: string
  isHTML: string
  /** O servidor de suporte do bot. */
  supportServer: string
  /** O link customizado do bot. */
  customURL?: string
}

export interface BotVotes {
  /** Votos atuais do bot. */
  current: number
  /** ID das pessoas que votaram no bot. */
  voteslog: string[]
}

export interface BotData {
  _id: string
  owner: string
  username: string
  discriminator: string
  avatar?: string
  status: string
  approvedBy: string
  dates: BotDates
  details: BotDetails
  votes: BotVotes
  count: object
}

/** Representa um bot no Zuraaa. */
export default class Bot {
  /** O ID do bot. */
  id: string
  /** O dono do bot. */
  owner: User | string
  /** O nome do bot */
  username: string
  /** O discriminador do bot. */
  discriminator: string
  /** O nome#discriminador do bot. */
  tag: string
  /** O avatar do bot. */
  avatar?: string
  /** O status do bot. */
  status: string
  /** Informações sobre as datas do bot. */
  dates: BotDates
  /** Detalhes do bot. */
  details: BotDetails
  /** Informações sobre os votos do bot. */
  votes: BotVotes
  /** Quem aprovou o bot. */
  approvedBy: string
  // Não sei oq é isso.
  count: object

  constructor (data: BotData, owner?: User) {
    this.id = data._id
    this.username = data.username
    this.discriminator = data.discriminator
    this.tag = `${this.username}#${this.discriminator}`
    this.status = data.status
    this.dates = data.dates
    this.details = data.details
    this.votes = data.votes
    this.approvedBy = data.approvedBy
    this.count = data.count
    this.owner = owner || data.owner
  }
}
