import storage from '../storage/pictures'
import prefetch from './prefetch'
import token from './token'
import axios from 'axios'
import copy from './copy'

const api = 'https://sm.ms/api/upload'

export default (file, config) => {
  return new Promise(resolve => {
    const formData = new FormData()
    formData.append('smfile', file)
    axios.post(api, formData, config)
      .then(({ data: { data: { url } } }) => {
        copy(url)
        storage.add({ url, token: token.token })
        resolve({ url })
        prefetch(url)
      }, err => { if (!axios.isCancel(err)) throw err })
  })
}
