class NegociationsService {
  async getWeeklyNegociations () {
    const res = await fetch(`/negociacoes/semana`)
    const data = await res.json()

    return data
  }

  async getBeforeNegociations () {
    const res = await fetch(`/negociacoes/anterior`)
    const data = await res.json()

    return data
  }

  async getOlderNegociations () {
    const res = await fetch(`/negociacoes/retrasada`)
    const data = await res.json()

    return data
  }
}