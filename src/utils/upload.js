import storage from '../storage/pictures'
import isType from 'sewing/libs/isType'
import notice from '../utils/notice'
import user from '../stores/user'
import prefetch from './prefetch'
import { t } from 'i18next'
import token from './token'
import axios from 'axios'
import api from './api'

function error (err) {
  if (!axios.isCancel(err)) {
    notice({ title: t('upload.fail') }, 'error')
    return Promise.reject(new Error('Upload Failure'))
  }
}

function success (url) {
  notice({ title: t('upload.success') }, 'success')
  storage.add({ url, token: token.token })
  prefetch(url)
  return { url }
}

export function smms (file, config) {
  const formData = new FormData()
  formData.append('smfile', file)
  return axios.post(process.env.SMMS, formData, config)
    .then(({ data: { code, data = {} } }) => {
      const { url } = data
      if (code !== 'success' || !url) return error()
      return success(url)
    }, error)
}

export function avi (file, config) {
  const formData = new FormData()
  const baseConfig = { withCredentials: true, __reject: true }
  const { preference } = user.options
  formData.append(typeof file === 'string' ? 'url' : 'file', file)
  if (preference) formData.append('type', preference)
  return api.post('/upload', formData, { ...config, ...baseConfig })
    .then(({ url }) => { return success(url) }, error)
}

export default (file, baseConfig) => {
  const upload = !user.id
    ? isType(file, 'String') ? avi : smms
    : avi

  return upload(file, baseConfig)
}
