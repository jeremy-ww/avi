import isType from 'sewing/libs/isType'
import { message } from 'antd'

const { Notification } = window

export default function notice (options, callback) {
  const noticeCallback = function () {
    if (isType(callback, 'String')) message[callback](options.title)
    if (isType(callback, 'Function')) callback()
  }

  if (document.visibilityState === 'visible' || !Notification) return noticeCallback()

  Notification.requestPermission(permission => {
    if (permission === 'granted') {
      const notification = new Notification(options.title, options)
      notification.addEventListener('click', function () {
        parent.focus()
        window.focus()
        this.close()
      })
    } else {
      noticeCallback()
    }
  })
}
