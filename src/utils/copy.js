import clipboard from 'clipboard-polyfill'
import { message } from 'antd'
import notice from './notice'
import { t } from 'i18next'

export default url => {
  return clipboard.writeText(url)
    .then(val => {
      const shortURL = url.replace(/^(.{20}).*(.{20})$/g, '$1...$2')
      notice({ title: t('copy.copied'), body: shortURL, icon: url }, function () {
        message.success(`${t('copy.copied')}: ${shortURL}`, 0.7)
      })
    }, () => {
      notice({ title: t('copy.failure.title'), body: t('copy.failure.description') }, function () {
        message.error(t('copy.error'))
      })
    })
}
