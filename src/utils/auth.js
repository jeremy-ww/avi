import api from './api'

export default function () {
  return api.get('/user', { __silence: true })
}
