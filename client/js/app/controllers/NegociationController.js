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

    ConnectionFactory
      .getConnection()
      .then(conn => new NegociationDao(conn))
      .then(dao => dao.getAll())
      .then(negociations => negociations
        .forEach(i => this._negociationList.add(i))
      )

  }
  
  async addNegociation (event) {
    event.preventDefault()

    try {
      const connection = await ConnectionFactory.getConnection()
      const dao = await new NegociationDao(connection)
        .add(this._createNegociation())

      this._negociationList.add(this._createNegociation())
      this._alertModel.message = 'Negociação adicionada com sucesso.'
      this._clearNegociationForm()
    } catch (err) {
      this._alertModel.message = err
    }
  }

  _createNegociation () {
    return new Negociation(
      DateHelper.convertTextToDate(this._date.value),
      Number(this._quantity.value),
      Number(this._value.value)
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
      const res = await Promise.all([
        this._importWeeklyNegociations(),
        this._importBeforeWeekNegociations(),
        this._importOlderNegociations()
      ])
  
      this._addNegociationsToList(res.flat())
      this._alertModel.message = 'Negociações importadas com sucesso.'
    } catch (err) {
      this._alertModel.message = 'Não foi possível importar as negociações.'
    }
  }

  _importWeeklyNegociations () {
    return new NegociationsService().getWeeklyNegociations()
  }

  _importBeforeWeekNegociations () {
    return new NegociationsService().getBeforeNegociations()
  }

  _importOlderNegociations () {
    return new NegociationsService().getOlderNegociations()
  }

  _addNegociationsToList (data) {
    data
    .map(n => new Negociation(new Date(n.data), n.quantidade, n.valor))
    .forEach( negociation => {
      const alreadyStored = this._negociationList.list
        .some(x => JSON.stringify(x) == JSON.stringify(negociation))
      
      if(!alreadyStored) {
        this._negociationList.add(negociation)
      }
    })
  }

  clearNegociations() {
    ConnectionFactory
    .getConnection()
    .then(conn => new NegociationDao(conn))
    .then(dao => dao.clear())
    .then(res => this._alertModel.message = res)
    .catch(err => console.log(err))

    this._negociationList.clear()
    this._alertModel.message = 'Negociações apagadas com sucesso.'
  }
}