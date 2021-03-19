class Negociation {
  constructor(date, quantity, value) {
    this._date = new Date(date.getTime())
    this._quantity = quantity
    this._value = value
    Object.freeze(this) // impede modificações diretas nos atributos da classe
  }

  get volume () {
    return this._quantity * this._value
  }

  get date () {
    return new Date(this._date.getTime())
  }

  get quantity () {
    return this._quantity
  }

  get value () {
    return this._value
  }
}