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

        request.onerror = e => {
          console.log(e.target.error)
          reject('It was not possible add a new negociation!')
        }
    })
  }

  getAll () {
    return new Promise((resolve, reject) => {
      const negociations = []
      const cursor = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor()

      cursor.onsuccess = e => {
        const result = e.target.result

        if(result) {
          const { _date, _quantity, _value } = result.value
          negociations.push(new Negociation(_date, _quantity, _value ))
          result.continue()
        } else {
          resolve(negociations)
        }
      }

      cursor.onerror = e => {
        reject(e.target.error.name)
      }

    })
  }

  clear() {
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear()
      
      request.onsuccess = e => {
        resolve('Negociations successfully removed!')
      }

      request.onerror = e => {
        reject(e.target.error.name)
      }
    })
  }
}