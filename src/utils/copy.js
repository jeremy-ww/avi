import clipboard from 'clipboard-polyfill'
import user from '../stores/user'
import { message } from 'antd'
import notice from './notice'
import { t } from 'i18next'

const short = text => text.replace(/\r/g, '').replace(/^(.{20}).*(.{20})$/g, '$1...$2')

const copyFailure = () => {
  notice({ title: t('copy.failure.title'), body: t('copy.failure.description') }, function () {
    message.error(t('copy.error'))
  })
}

export default url => {
  const string = user.options.markdown ? `![](${url})` : url

  return clipboard.writeText(string)
    .then(() => {
      const shortURL = short(string)
      notice({ title: t('copy.copied'), body: shortURL, icon: url }, function () {
        message.success(`${t('copy.copied')}: ${string}`, 0.7)
      })
    }, copyFailure)
}

export function copyText (text) {
  return clipboard.writeText(text)
    .then(() => {
      const shortText = short(text)
      notice({ title: t('copy.copied'), body: text }, function () {
        message.success(`${t('copy.copied')}: ${shortText}`, 0.7)
      })
    }, copyFailure)
}
