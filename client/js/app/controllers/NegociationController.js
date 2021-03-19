class NegociationController {

  constructor () {
    const $ = document.querySelector.bind(document)
    this._date = $('#date')
    this._quantity = $('#quantity')
    this._value = $('#value')
  }
  create (event) {
    event.preventDefault()
    let date = DateHelper.convertTextToDate(this._date.value)
    const negociation = new Negociation(
      date,
      this._quantity,
      this._value
    )

    const teste = new DateHelper() 
    console.log(teste)
     this.renderNegociation(negociation)
  }

  renderNegociation (negociation) {
    console.log(negociation)
  }
}