import { WrappedCloudStorageForm as CloudStorageForm } from '../components/CloudStorageForm'
import { firebase } from '../utils/auth'
import { Button, message } from 'antd'
import '../styles/cloud-storage.scss'
import notice from '../utils/notice'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import React from 'react'

function GrantAuthorizationButton (props) {
  return (
    <div className="cloud-storage-square">
      <div align="center">
        <p>Authorize Vov to upload pictures to your {props.account} account.</p>
        <Button type="primary" ghost>Authorize</Button>
      </div>
    </div>
  )
}

GrantAuthorizationButton.propTypes = {
  account: PropTypes.string
}

const CLOUD_LIST = [
  {
    icon: require('../statics/default.svg'),
    name: 'Default',
    component: <div className="cloud-storage-square">
      The picture will be uploaded to the sm.ms cloud storage by default.
    </div>
  },
  {
    icon: require('../statics/qiniu.png'),
    name: 'Qiniu Cloud',
    component: <CloudStorageForm placeholder="https://o77qb5l10.qnssl.com"></CloudStorageForm>
  },
  {
    icon: require('../statics/upyun.jpg'),
    name: 'Upyun Cloud',
    component: <CloudStorageForm placeholder="http://vov-static.test.upcdn.net/"></CloudStorageForm>
  },
  {
    icon: require('../statics/aliyun.jpg'),
    name: 'Aliyun OSS',
    component: <CloudStorageForm placeholder="阿里云"></CloudStorageForm>
  },
  {
    icon: require('../statics/tencent.jpg'),
    name: 'Tecent COS',
    component: <CloudStorageForm placeholder="https://vov-static-1251243069.cos.ap-beijing.myqcloud.com/"></CloudStorageForm>
  },
  {
    icon: require('../statics/aws.png'),
    name: 'Amazon S3',
    component: <CloudStorageForm placeholder="AWS"></CloudStorageForm>,
    disable: true
  },
  {
    icon: require('../statics/imgur.jpg'),
    name: 'Imgur',
    component: GrantAuthorizationButton({ account: 'Imgur' }),
    disable: true
  },
  {
    icon: require('../statics/flickr.jpg'),
    name: 'Flickr',
    component: GrantAuthorizationButton({ account: 'Flickr' }),
    disable: true
  }
]

const CloudList = function ({ component, disable, icon, name }, toggleCloudStorageForm) {
  return (
    <div
      onClick={() => { toggleCloudStorageForm(component) }}
      className={classNames({ disable })}
      key={name}>
      <img src={icon} alt={name} />
      <span>{name}</span>
    </div>
  )
}

CloudList.propTypes = {
  component: PropTypes.object,
  disable: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string
}

export default class CloudStorage extends React.Component {
  state = {
    component: CLOUD_LIST[0].component
  }

  toggleCloudStorageForm = component => {
    this.setState({ component })
  }

  auth = () => {
    // 要在 mobx 中存储 token 信息
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(result => {
      firebase.auth().currentUser.getIdToken(true).then(token => {
        console.log(token)
      })
    }, err => {
      if (err) {
        notice({ title: t('auth.error') }, function () {
          message.error(t('auth.error'))
        })
      }
    })
  }

  render () {
    const { toggleCloudStorageForm, auth } = this
    return (
      <section
        className={classNames('cloud-storage', { 'no-auth': true })}
        onClick={auth}>
        <aside>
          {CLOUD_LIST.map(cloud => CloudList(cloud, toggleCloudStorageForm))}
        </aside>
        <main>
          {this.state.component}
        </main>
      </section>
    )
  }
}
