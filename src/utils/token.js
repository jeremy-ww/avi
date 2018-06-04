export default {
  get token () {
    return Math.random().toString(36).slice(2) + '_' + Date.now()
  }
}
