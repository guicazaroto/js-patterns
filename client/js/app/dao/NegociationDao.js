class NegociationDao {
  constructor (connection) {
    this._connection = connection
    this._store = 'negociations'
  }

  add (neg) {
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(neg)

        request.onsuccess = e => {
          resolve()
        }

        reject.onerror = e => {
          console.log(e.target.error)
          reject('It was not possible add a new negociation!')
        }
    })
  }
}