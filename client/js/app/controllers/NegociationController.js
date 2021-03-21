class NegociationController {

  constructor () {
    const $ = document.querySelector.bind(document)
    this._date = $('#date')
    this._quantity = $('#quantity')
    this._value = $('#value')
    this._negociationList = new NegociationList()
    this._negociationsView = new NegociationsView($('#negociations-view'))

    this._negociationsView.handler(this._negociationList)
  }
  addNegociation (event) {
    event.preventDefault()
    this._negociationList.add(this._createNegociation())
    this._negociationsView.handler(this._negociationList)
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
}