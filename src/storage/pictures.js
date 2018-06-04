import storage from '../utils/storage'

export default new class {
  get pictures () {
    const { token2date } = this
    return storage.get('pictures', [])
      .sort((prev, next) => token2date(prev.token) < token2date(next.token))
  }
  token2date (token) {
    return Number(token.slice(12))
  }
  add (picture) {
    const pictures = this.pictures
    storage.set('pictures', pictures.concat(picture))
    return this.pictures
  }
  remove (token) {
    const pictures = this.pictures
      .filter(picture => picture.token !== token)
    storage.set('pictures', pictures)
    return this.pictures
  }
}
