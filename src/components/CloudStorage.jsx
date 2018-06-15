import GrantAuthorizationButton from '../components/GrantAuthorizationButton'
import CloudStorageForm from '../components/CloudStorageForm'
import { Trans } from 'react-i18next'
import { observer } from 'mobx-react'
import '../styles/cloud-storage.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import user from '../stores/user'
import { Button } from 'antd'
import React from 'react'

@observer
class GrantAuthorizationButtonHOC extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    path: PropTypes.string
  }

  render () {
    const { props: { name, path } } = this
    const normalize = name.toLowerCase()
    const authorize = (path || `/connect/${normalize}`) + location.search
    const account = user.grant[normalize]

    const Authorized = (
      <GrantAuthorizationButton>
        <React.Fragment>
          <p>
            <Trans i18nKey="setting.common.cloud.greet" values={{ name: account }}>
              User <strong>{{ name }}</strong> is logged in
            </Trans>
          </p>
          <a href={`${process.env.API}/auth/${normalize}/logout`}>
            <Trans i18nKey="setting.common.cloud.logout" />
          </a>
        </React.Fragment>
      </GrantAuthorizationButton>
    )

    if (account) return Authorized

    return (
      <GrantAuthorizationButton>
        <React.Fragment>
          <p>
            <Trans i18nKey="setting.common.cloud.grant" values={{ name }} />
          </p>
          <Button
            onClick={() => { window.location.href = process.env.API + authorize }}
            type="primary"
            ghost>
            {name} Authorize
          </Button>
        </React.Fragment>
      </GrantAuthorizationButton>
    )
  }
}

export const CLOUD_LIST = [
  {
    icon: require('../statics/default.svg'),
    name: 'Default',
    key: 'smms',
    component: (
      <div className="cloud-storage-square">
        <Trans i18nKey="setting.common.cloud.tips" />
      </div>
    )
  },
  {
    icon: require('../statics/aws.png'),
    name: 'Amazon S3',
    key: 'amazon',
    component: (
      <CloudStorageForm
        name="amazon"
        fields={[
          { name: 'accessKeyId', type: 'password' },
          { name: 'secretAccessKey', type: 'password' },
          'bucket'
        ]}
      />
    )
  },
  {
    icon: require('../statics/aliyun.jpg'),
    name: 'Aliyun OSS',
    key: 'aliyun',
    component: (
      <CloudStorageForm
        name="aliyun"
        fields={[
          { name: 'accessKeyId', type: 'password' },
          { name: 'accessKeySecret', type: 'password' },
          'bucket',
          'region'
        ]}
      />
    )
  },
  {
    icon: require('../statics/tencent.jpg'),
    name: 'Tecent COS',
    key: 'tecent',
    component: (
      <CloudStorageForm
        name="tecent"
        fields={[
          { name: 'SecretId', type: 'password' },
          { name: 'SecretKey', type: 'password' },
          'Bucket',
          'Region'
        ]}
      />
    )
  },
  {
    icon: require('../statics/imgur.jpg'),
    name: 'Imgur',
    key: 'imgur',
    component: <GrantAuthorizationButtonHOC name="Imgur" path="/auth/imgur" />
  },
  {
    icon: require('../statics/flickr.jpg'),
    name: 'Flickr',
    key: 'flickr',
    component: <GrantAuthorizationButtonHOC name="Flickr" />
  },
  {
    icon: require('../statics/qiniu.png'),
    name: 'Qiniu Cloud',
    key: 'qiniu',
    component: (
      <CloudStorageForm
        name="qiniu"
        fields={[
          { name: 'accessKey', type: 'password' },
          { name: 'secretKey', type: 'password' },
          'bucket',
          'domain'
        ]}
      />
    )
  },
  {
    icon: require('../statics/upyun.jpg'),
    name: 'Upyun Cloud',
    key: 'upyun',
    component: (
      <CloudStorageForm
        name="upyun"
        fields={[
          'domain',
          'operator',
          { name: 'password', type: 'password' },
          'bucket'
        ]}
      />
    )
  }
]

function CloudList ({ component, disable, icon, name, key }, focus, toggleCloudStorageForm) {
  return (
    <div
      onClick={() => { toggleCloudStorageForm(component, key) }}
      className={classNames({ disable, focus: key === focus })}
      tabIndex="-1"
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
  name: PropTypes.string,
  key: PropTypes.string
}

@observer
export default class CloudStorage extends React.Component {
  state = {
    component: CLOUD_LIST.find(({ key }) => key === (user.options.preference || 'smms')).component,
    focus: user.options.preference
  }

  toggleCloudStorageForm = (component, focus) => {
    this.setState({ component, focus })
  }

  render () {
    const { toggleCloudStorageForm, state: { focus } } = this
    return (
      <section
        className={classNames('cloud-storage')}>
        <aside>
          {CLOUD_LIST.map(cloud => CloudList(cloud, focus, toggleCloudStorageForm))}
        </aside>
        <main>
          {this.state.component}
        </main>
      </section>
    )
  }
}
