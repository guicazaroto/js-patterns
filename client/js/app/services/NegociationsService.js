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
}