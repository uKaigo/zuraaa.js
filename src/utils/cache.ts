export default class HTTPCache {
  private max: number
  private map: { [id: string]: number }
  private container: [string, any][]

  constructor (maxSize: number = 100) {
    this.max = maxSize
    this.container = []
    this.map = {}
  }

  private reallocate () {
    this.map = {}
    for (const value of this.container) {
      const index = this.container.indexOf(value)
      this.map[value[0]] = index
    }
  }

  get (id: string) {
    if (id in this.map) {
      const val = this.container[this.map[id]]

      this.container.splice(this.container.indexOf(val), 1)
      this.container.unshift(val)

      this.reallocate()

      return val[1]
    }

    return null
  }

  private _insert (id: string, value: any) {
    this.container.unshift([id, value])
    this.reallocate()
  }

  insert (id: string, value: any) {
    if (id in this.map) {
      this.get(id)
      return
    }

    if (this.container.length > this.max) {
      this.container.pop()
    }

    this._insert(id, value)
  }
}
