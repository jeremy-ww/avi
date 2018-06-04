import { translate } from 'react-i18next'
import upload from '../utils/upload'
import source from '../utils/source'
import '../styles/vov-dragger.scss'
import { Upload, Icon } from 'antd'
import PropTypes from 'prop-types'
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
    this.props.setPicture(URL.createObjectURL(file))
    const { cancel, token } = source()
    upload(file, { cancelToken: token })
      .then(({ url }) => { this.props.replacePictureURL(url) })
    this.props.storeUploadCancel(cancel)
    return {
      abort () {
        cancel()
      }
    }
  }

  render () {
    const { props: { t } } = this
    return (
      <Dragger
        customRequest={this.customRequest}
        className={`${this.props.className} vov-dragger`}
        listType="picture"
        showUploadList={false}
        accept="image/gif, image/jpeg, image/jpg, image/png">
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          {t('home.title')}
        </p>
        <p className="ant-upload-hint">
          {t('home.description')}
        </p>
      </Dragger>
    )
  }
}
