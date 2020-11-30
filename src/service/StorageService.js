class StorageService {
  getItem (key) {
    return window.localStorage.getItem(key)
  }

  putItem (key, val) {
    window.localStorage.setItem(key, val)
  }

  remove (key) {
    window.localStorage.removeItem(key)
  }
}

export default new StorageService()
