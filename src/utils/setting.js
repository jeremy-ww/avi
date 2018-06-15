import { message } from 'antd'
import { t } from 'i18next'
import api from './api'

const error = () => {
  return Promise.reject(message.error(t('setting.save.fail')))
}

export default settings => {
  return api.post('/setting', { settings }, { __reject: true })
    .then(data => {
      message.success(t('setting.save.success'))
    }, error)
}
