class NegociationsService {
  async getWeeklyNegociations () {
    const res = await fetch(`/negociacoes/semana`)
    const data = await res.json()

    return data
  }
}