class NegociationController {

  constructor () {
    const $ = document.querySelector.bind(document)
    this._date = $('#date')
    this._quantity = $('#quantity')
    this._value = $('#value')
    

    this._negociationsView = new NegociationsView($('#negociations-view'))
    this._negociationList = new Bind(
      new NegociationList(),
      this._negociationsView,
      ['add', 'clear']
    )


    this._alertView = new AlertView($('#alert-view'))
    this._alertModel = new Bind(
      new AlertMessage(),
      this._alertView,
      ['message'],
    )
  }
  
  addNegociation (event) {
    event.preventDefault()
    this._negociationList.add(this._createNegociation())
    this._alertModel.message = 'Negociação adicionada com sucesso.'

    this._clearNegociationForm()
  }

  _createNegociation () {
    return new Negociation(
      DateHelper.convertTextToDate(this._date.value),
      this._quantity.value,
      this._value.value
    )
  }

  _clearNegociationForm() {
    this._date.value = ''
    this._quantity.value = 1
    this._value.value = '0.00'
    this._date.focus()
  }

  clearNegociationTable () {
    this._negociationList.clear()
    this._alertModel.message = 'Negociações apagadas com sucesso.'
  }
}