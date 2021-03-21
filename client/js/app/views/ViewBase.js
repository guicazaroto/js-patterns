class ViewBase {
  constructor (element) {
    this._domElement = element
  }

  template() {
    throw new Error('It`s necessary implement template method')
  }

  handler(model) {
    this._domElement.innerHTML = this.template(model) 
  }

}