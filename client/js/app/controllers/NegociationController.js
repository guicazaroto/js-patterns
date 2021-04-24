class NegociationController {
  constructor () {
    const $ = document.querySelector.bind(document)
    this._date = $('#date')
    this._quantity = $('#quantity')
    this._value = $('#value')
    this._service = new NegociationsService()

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
    
    this._init()


  }

  _init() {
    this._service
      .getAll()
      .then(negociations => negociations
        .forEach(negociation => this._negociationList.add(negociation))
      ).catch(err => this._alertModel.message = err)

    setInterval(() => this.importNegociations(), 10000)
  }
  
  async addNegociation (event) {
    event.preventDefault()
    const negociation = this._createNegociation()
  
    try {
      const res = await this._service
        .registerNegociation(negociation)

      this._negociationList.add(negociation)
      this._alertModel.message = res
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
    return this._service.getWeeklyNegociations()
  }

  _importBeforeWeekNegociations () {
    return this._service.getBeforeNegociations()
  }

  _importOlderNegociations () {
    return this._service.getOlderNegociations()
  }

  _addNegociationsToList (data) {
    data
    .map(n => new Negociation(new Date(n.data), n.quantidade, n.valor))
    .forEach(negociation => {
      if(!this._isNegociationAlreadyStored(negociation)) {
        this._negociationList.add(negociation)
      }
    })
  }

  _isNegociationAlreadyStored(negociation) {
    return this._negociationList.list
      .some(x => JSON.stringify(x) == JSON.stringify(negociation))
  }

  async clearNegociations() {
    try { 
      const res = await this._service.clearNegociations()
      this._alertModel.message = res
      this._negociationList.clear()
    } catch(err) {
      this._alertModel.message = err
    }
  }
}