export default function notice (options, callback) {
  const { Notification } = window
  if (document.visibilityState === 'visible' || !Notification) return callback()

  Notification.requestPermission(permission => {
    if (permission === 'granted') {
      /* eslint-disable no-new */
      new Notification(options.title, options)
    } else {
      callback()
    }
  })
}
