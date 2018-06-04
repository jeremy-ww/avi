import { WrappedCloudStorageForm as CloudStorageForm } from '../components/CloudStorageForm'
import '../styles/cloud-storage.scss'
import PropTypes from 'prop-types'
import { Button } from 'antd'
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
    component: <CloudStorageForm placeholder="AWS"></CloudStorageForm>
  },
  {
    icon: require('../statics/imgur.jpg'),
    name: 'Imgur',
    component: GrantAuthorizationButton({ account: 'Imgur' })
  },
  {
    icon: require('../statics/flickr.jpg'),
    name: 'Flickr',
    component: GrantAuthorizationButton({ account: 'Flickr' })
  }
]

export default class CloudStorage extends React.Component {
  state = {
    component: CLOUD_LIST[0].component
  }
  toggleCloudStorageForm = component => {
    this.setState({ component })
  }
  render () {
    return (
      <section className="cloud-storage">
        <aside>
          {
            CLOUD_LIST.map(({ icon, name, component }, key) => {
              return (
                <div
                  onClick={() => { this.toggleCloudStorageForm(component) }}
                  key={key}>
                  <img src={icon} alt={name} />
                  <span>{name}</span>
                </div>
              )
            })
          }
        </aside>
        <main>
          {this.state.component}
        </main>
      </section>
    )
  }
}
