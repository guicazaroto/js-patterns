class NegociationList {
  constructor () {
    this._list = []
  }

  add (negociation) {
    this._list.push(negociation)
  }

  get list () {
    return [].concat(this._list)
  }

  clear() {
    this._list = []
  }
}