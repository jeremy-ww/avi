import throttleWith from 'sewing/libs/throttleWith'
import { message } from 'antd'
import notice from './notice'
import axios from 'axios'

const api = axios.create({ baseURL: process.env.API, withCredentials: true })
const shouldWarnHttpError = ([prev = {}], [next = {}]) => prev.code === next.code

const error = throttleWith(err => {
  notice({ title: err.message }, function () {
    message.error(err.message)
  })
}, 50, shouldWarnHttpError)

api.interceptors.response.use(({ data, config }) => {
  if (data && data.code === 200) return data.data
  if (config.__error) error(data)
  if (config.__reject) return Promise.reject(data)
}, ({ config, response }) => {
  if (config.__error) error({ message: 'Request Error' })
  if (config.__reject) return Promise.reject(response)
})

export default api
