import { createStyleElement } from 'sewing'

export default (url, type = 'image') => {
  createStyleElement(url, element => {
    element.rel = 'prefetch'
    element.as = type
    return element
  })
}
