import { observable, runInAction, action } from 'mobx'
import auth from '../utils/auth'

export default new class User {
  @observable
  id = undefined

  @observable
  displayName = undefined

  @observable
  image = undefined

  @observable
  options = {
    preference: undefined,
    markdown: false
  }

  @observable
  aliyun = {}

  @observable
  tecent = {}

  @observable
  qiniu = {}

  @observable
  upyun = {}

  @observable
  grant = {}

  constructor () {
    this.requestUserInfo()
  }

  @action
  requestUserInfo = () => {
    auth().then(user => {
      if (!user || !user.id) return
      runInAction(() => {
        Object.assign(this, user)
      })
    })
  }

  @action
  changeOptions = options => {
    Object.assign(this.options, options)
  }
}
