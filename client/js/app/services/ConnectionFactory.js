const dbname = 'aluraframe'
const version = 1
const stores = ['negociations']

class ConnectionFactory {
  constructor () {
    throw new Error('Is not possible instatiated this class!')
  }

  static getConnection () {
    return new Promise((resolve, reject) => {
      const db = indexedDB.open(dbname, version)
  
      db.onupgradeneeded = e => {
        ConnectionFactory._createTable(e.target.result)
      }
  
      db.onsuccess = e => {
        resolve(e.target.result)
      }

      db.onerror = e => {
        reject(e.target.result)
      }
    })
  }

  static _createTable (db) {
    stores.forEach(store => {
      if(db.objectStoreNames.contains(store)) {
        db.deleteObjectStore(store)
      }

      db.createObjectStore(store, { autoincrement: true })
    })
  }
}