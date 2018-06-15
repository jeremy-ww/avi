import createSrcElement from 'sewing/libs/createSrcElement'
import { Scrollbars } from 'react-custom-scrollbars'
import OCRLoading from '../components/OCRLoading'
import copy, { copyText } from '../utils/copy'
import startsWith from 'lodash/startsWith'
import LazyLoad from 'react-lazy-load'
import notice from '../utils/notice'
import '../styles/picture-list.scss'
import { Icon, message } from 'antd'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import get from 'sewing/libs/get'
import api from '../utils/api'
import { t } from 'i18next'
import React from 'react'

const OCRButton = ({ distinguish }) => {
  return (
    <i onClick={distinguish} className="iconfont anticon-text ocr-button" />
  )
}

OCRButton.propTypes = {
  distinguish: PropTypes.func
}

const OCRText = ({ text }) => {
  return (
    <section onClick={() => { copyText(text.join('\r')) }} className="ocr-text">
      <Scrollbars>
        <section className="ocr-container">
          {text.map((t, k) => <p key={k}>{t}</p>)}
        </section>
      </Scrollbars>
    </section>
  )
}

OCRText.propTypes = {
  text: PropTypes.array
}

export default class PictureList extends React.Component {
  static propTypes = {
    pictures: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onRemovePicture: PropTypes.func,
    children: PropTypes.node,
    remove: PropTypes.bool,
    grid: PropTypes.bool
  }

  state = {
    ocr: {}
  }

  removePictureByKey = token => {
    this.writeInOCRText(token)
    this.props.onRemovePicture(token)
  }

  handleCopyImageUrl = url => {
    if (url && startsWith(url, 'http')) copy(url)
  }

  writeInOCRText = (token, text, loading = false) => {
    this.setState(({ ocr }) => {
      return { ocr: Object.assign(ocr, { [token]: { text, loading } }) }
    })
  }

  distinguish = (url, token) => {
    const { state: { ocr }, writeInOCRText } = this
    if (get(ocr[token], 'text')) return writeInOCRText(token)
    writeInOCRText(token, undefined, true)
    const setImageCrossOrigin = img => (img.crossOrigin = 'Anonymous') && img
    createSrcElement('img', url, setImageCrossOrigin)
      .then(image => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.height = image.naturalHeight
        canvas.width = image.naturalWidth
        ctx.drawImage(image, 0, 0)
        const base64 = canvas.toDataURL()
        api.post('/ocr/distinguish', { image: base64 }, { __reject: true })
          .then(text => { writeInOCRText(token, text) }, () => {
            const reason = t('records.ocr.fail')
            notice({ title: reason, body: reason }, function () {
              writeInOCRText(token)
              message.error(reason)
            })
          })
      })
  }

  render () {
    const {
      state: { ocr },
      props: { pictures, grid, children, remove },
      removePictureByKey,
      handleCopyImageUrl,
      distinguish
    } = this
    return (
      <section className={classNames('picture-list', { grid })}>
        {pictures.map(({ url, blob, token }) => {
          return (
            <div
              className={classNames({ 'ocr': get(ocr[token], 'loading') || get(ocr[token], 'text') })}
              key={token}>
              {get(ocr[token], 'loading') &&
                <OCRLoading className="ocr-button" />}
              {remove &&
                <Icon onClick={() => { removePictureByKey(token) }} type="delete" />}
              {!get(ocr[token], 'loading') &&
                <OCRButton distinguish={() => { distinguish(blob || url, token) }} />}
              <LazyLoad height={250} offset={100}>
                <img onClick={() => { handleCopyImageUrl(url) }} src={blob || url} alt="" />
              </LazyLoad>
              {children && children(url)}
              {get(ocr[token], 'text') && <OCRText text={ocr[token].text} />}
            </div>
          )
        })}
      </section>
    )
  }
}
