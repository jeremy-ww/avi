import GrantAuthorizationButton from '../components/GrantAuthorizationButton'
import CloudStorage, { CLOUD_LIST } from '../components/CloudStorage'
import { observer, inject, PropTypes } from 'mobx-react'
import { Button, Avatar, Select, Switch } from 'antd'
import Legend from '../components/Legend'
import Alert from '../components/Alert'
import setting from '../utils/setting'
import storage from '../utils/storage'
import { Trans } from 'react-i18next'
import user from '../stores/user'
import '../styles/setting.scss'
import { t } from 'i18next'
import React from 'react'

const CloudSelect = CLOUD_LIST.map(({ name, key, disable }) => {
  return <Select.Option disabled={disable} value={key} key={key}>{name}</Select.Option>
})

class GoogleOAuthButton extends React.Component {
  auth = () => {
    window.location.href = `${process.env.API}/connect/google` + location.search
  }

  render () {
    const { auth } = this
    return (
      <GrantAuthorizationButton>
        <p>{t('auth.tips')}</p>
        <Button onClick={auth} type="primary" ghost>Google Authorize</Button>
      </GrantAuthorizationButton>
    )
  }
}

@inject('user')
@observer
export default class Setting extends React.Component {
  static propTypes = {
    user: PropTypes.observableObject
  }

  state = {
    isVisited: storage.get('isReadInstructions')
  }

  changeOptions = options => {
    user.changeOptions(options)
    setting({ options: user.options }).then(() => {
      user.requestUserInfo()
    })
  }

  render () {
    const { props: { user: { id, displayName = '****', image, options = {} } } } = this
    const { state: { isVisited }, changeOptions } = this

    const FirstTimeVisitedAlert = (
      <Alert>
        <Trans i18nKey="setting.alert" useDangerouslySetInnerHTML>
          Before using AVI, be sure to
          <a href={`https://github.com/Army-U/avi${t('setting.common.warn')}`}
            onClick={() => { storage.set('isReadInstructions', Date.now()) }}
            target="_blank">
            read the instructions first
          </a>.
        </Trans>
      </Alert>
    )

    const Setting = (
      <React.Fragment>
        {!isVisited && FirstTimeVisitedAlert}

        <Legend title={t('setting.common.user.title')}>
          <section className="user-info">
            <Avatar src={image} />
            <p>
              <span>{t('setting.common.user.id')}:</span>
              <span>{id}</span>
            </p>
            <p>
              <span>{t('setting.common.user.name')}:</span>
              <span>{displayName}</span>
            </p>
            <p>
              <a href={`${process.env.API}/auth/google/logout`}>
                {t('setting.common.user.logout')}
              </a>
            </p>
          </section>
        </Legend>

        <Legend title={t('setting.common.setting.title')}>
          <section className="setting-table">
            <div>
              <div>{t('setting.common.setting.preference')}:</div>
              <div>
                <Select
                  defaultValue={options.preference || 'default'}
                  style={{ width: 120 }}
                  onChange={preference => { changeOptions({ preference }) }}>
                  {CloudSelect}
                </Select>
              </div>
            </div>
            <div>
              <div>{t('setting.common.setting.format')}:</div>
              <div>
                <Switch
                  defaultChecked={options.markdown}
                  onChange={markdown => { changeOptions({ markdown }) }} />
              </div>
            </div>
          </section>
        </Legend>

        <Legend title={t('setting.common.cloud.title')}>
          <React.Fragment>
            <CloudStorage />
          </React.Fragment>
        </Legend>

        <Legend title={t('setting.common.source.title')}>
          <div className="source-code">
            <a href="https://github.com/Army-U/avi" target="_blank">
              {t('setting.common.source.client')} {t('setting.common.source.code')}
            </a>
            <span>|</span>
            <a href="https://github.com/Army-U/avi-api" target="_blank">
              {t('setting.common.source.server')} {t('setting.common.source.code')}
            </a>
          </div>
        </Legend>
      </React.Fragment>
    )

    return (
      <section className="setting">
        <div className="container">
          {id && Setting}
          {!id && <GoogleOAuthButton />}
        </div>
      </section>
    )
  }
}
