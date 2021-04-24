class NegociationsService {
  constructor () {
    this.http = new HttpService()
  }

  getWeeklyNegociations () {
    return this.http.get(`/negociacoes/semana`)
  }

  getBeforeNegociations () {
    return this.http.get(`/negociacoes/anterior`)
  }

  getOlderNegociations () {
    return this.http.get(`/negociacoes/retrasada`)
  }

  async registerNegociation (negociation) {
    try {
      const connection = await ConnectionFactory.getConnection()
      const dao = await new NegociationDao(connection)
        .add(negociation)

      return 'Negociação criada com sucesso.'
    } catch(err) {
      return 'Não foi possível criar a negociação'
    }

  }
}