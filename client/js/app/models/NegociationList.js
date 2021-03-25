class NegociationList {
  constructor (callback) {
    this._list = []
    this._callback = callback
  }

  add (negociation) {
    this._list.push(negociation)
    this._callback(this)
  }

  get list () {
    return [].concat(this._list)
  }

  clear() {
    this._list = []
    this._callback(this)
  }
}