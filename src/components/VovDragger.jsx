import { translate, Trans } from 'react-i18next'
import upload from '../utils/upload'
import source from '../utils/source'
import '../styles/vov-dragger.scss'
import classNames from 'classnames'
import { Upload, Icon } from 'antd'
import PropTypes from 'prop-types'
import symbol from '../utils/token'
import React from 'react'

const { Dragger } = Upload

@translate(['translations'])
export default class VovDragger extends React.Component {
  static propTypes = {
    setPicture: PropTypes.func,
    storeUploadCancel: PropTypes.func,
    replacePictureURL: PropTypes.func,
    className: PropTypes.string,
    t: PropTypes.func
  }

  customRequest = ({ file }) => {
    const { props: { setPicture, replacePictureURL, storeUploadCancel } } = this
    const { token } = symbol
    setPicture(token, URL.createObjectURL(file))
    const { cancel, token: cancelToken } = source()
    upload(file, { cancelToken })
      .then(
        ({ url }) => { replacePictureURL(token, url) },
        () => { replacePictureURL(token, '') }
      )
    storeUploadCancel(token, cancel)
    return {
      abort () {
        cancel()
      }
    }
  }

  render () {
    const { props: { t, className } } = this
    return (
      <Dragger
        customRequest={this.customRequest}
        className={classNames('vov-dragger', className)}
        accept="image/gif, image/jpeg, image/jpg, image/png"
        showUploadList={false}
        listType="picture"
        multiple>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          {t('home.title')}
        </p>
        <p className="ant-upload-hint">
          <Trans i18nKey="home.description" useDangerouslySetInnerHTML>
            Supports right-pasting image link or image file uploads. <strong>Please do not upload company or other privacy images</strong>
          </Trans>
        </p>
      </Dragger>
    )
  }
}
