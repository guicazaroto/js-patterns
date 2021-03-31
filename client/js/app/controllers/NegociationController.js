class NegociationController {

  constructor () {
    const $ = document.querySelector.bind(document)
    this._date = $('#date')
    this._quantity = $('#quantity')
    this._value = $('#value')
    
    this._negociationList = new Bind(
      new NegociationList(),
      new NegociationsView($('#negociations-view')),
      'add', 'clear'
    )

    this._alertModel = new Bind(
      new AlertMessage(),
      new AlertView($('#alert-view')),
      'message',
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

  async importNegociations () {
    try {
      const data = await new NegociationsService().getWeeklyNegociations()

      this._addNegociationsToList(data)
      this._alertModel.message = 'Negociações importadas com sucesso.'
    } catch(err) {
      this._alertModel.message = 'Ocorreu um erro ao importar as negociações.'
    }
  }

  _addNegociationsToList (data) {
    data
    .map(n => new Negociation(new Date(n.data), n.quantidade, n.valor))
    .forEach(i => this._negociationList.add(i))
  }

  clearNegociationTable () {
    this._negociationList.clear()
    this._alertModel.message = 'Negociações apagadas com sucesso.'
  }
}