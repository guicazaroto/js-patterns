class HttpService {
  async get (url) {
    const res = await fetch(url)
    return res.json()
  }
}