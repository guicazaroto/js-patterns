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

  async getAll () {
    try {
      const conn = await ConnectionFactory.getConnection()
      const res = new NegociationDao(conn).getAll()

      return res
    } catch(err) {
      return 'Error to request negociations.'
    }

  }

  async registerNegociation (negociation) {
    try {
      const connection = await ConnectionFactory.getConnection()
      const dao = await new NegociationDao(connection).add(negociation)

      return 'Negociation created.'
    } catch(err) {
      return 'It\'s not possible create a negociation.'
    }
  }

  async clearNegociations() {
    try {
      const conn = await ConnectionFactory.getConnection()
      const res = await new NegociationDao(conn).clear()

      return 'Negociation removed successfully.'
    } catch (err) {
      return 'It\'s not possible remove a negociation.'
    }

  }
}