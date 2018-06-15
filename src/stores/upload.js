import startsWith from 'lodash/startsWith'
import { observable, action } from 'mobx'

export default new class Upload {
  @observable
  map = {}

  @action
  setPicture = (token, url) => {
    const isBlob = startsWith(url, 'blob:')
    this.map[token] = { [isBlob ? 'blob' : 'url']: url }
  }

  @action
  replacePictureURL = (token, url) => {
    const upload = this.map[token]
    if (upload) Object.assign(upload, { url })
  }

  @action
  storeUploadCancel = (token, cancel) => {
    const upload = this.map[token]
    if (upload) Object.assign(upload, { cancel, url: undefined })
  }

  @action
  onRemovePicture = token => {
    const upload = this.map[token]
    if (upload && upload.cancel) upload.cancel()
    delete this.map[token]
  }

  @action
  clear = () => {
    const { map, onRemovePicture } = this
    Object.keys(map).forEach(token => {
      onRemovePicture(token)
    })
  }
}
