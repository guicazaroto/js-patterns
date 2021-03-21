class AlertMessage {
  constructor (message) {
    this._message = message
  }

  set message (msg) {
    this._message = msg 
  }

  get message () {
    return this._message
  }
}