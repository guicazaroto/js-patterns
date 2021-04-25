class AlertMessage {
  constructor (msg='') {
    this._message = msg
  }
  get message () {
    return this._message
  }

  set message (msg) {
    return this._message = msg 
  }
}