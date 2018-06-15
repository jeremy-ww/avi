import isImage from '../utils/isImage'
import upload from '../utils/upload'
import source from '../utils/source'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { get } from 'sewing'
import React from 'react'

export default class Snag extends React.Component {
  static propTypes = {
    setPicture: PropTypes.func,
    storeUploadCancel: PropTypes.func,
    replacePictureURL: PropTypes.func,
    children: PropTypes.node
  }

  state = {
    el: undefined,
    cancel: undefined
  }

  render () {
    return (
      <section ref="el">
        {this.props.children}
      </section>
    )
  }

  upload = async file => {
    const { cancel, token } = source()
    const blob = file instanceof File ? URL.createObjectURL(file) : file
    this.props.setPicture(blob)
    this.state.cancel = cancel
    this.props.storeUploadCancel(cancel)
    try {
      const { url } = await upload(file, { cancelToken: token })
      this.props.replacePictureURL(url)
    } catch (e) {
      this.props.replacePictureURL('')
    }
  }

  handlePasteEvent = e => {
    const file = get(e, 'clipboardData.files.0', {})
    const { upload } = this
    if (file instanceof File) return upload(file)
    const urlMaybeDefectProtocol = e.clipboardData.getData('Text')
    const url = /^(https?:)?\/\/[^/]/.test(urlMaybeDefectProtocol)
      ? urlMaybeDefectProtocol
      : ('http://' + urlMaybeDefectProtocol)
    isImage(url).then(upload.bind(this, url), noop)
  }

  componentDidMount () {
    const { props, refs, handlePasteEvent } = this
    const el = this.el = props.children ? refs.el : document
    el.addEventListener('paste', handlePasteEvent)
  }

  componentWillUnmount () {
    const { cancel } = this.state
    if (cancel) cancel()
    this.el.removeEventListener('paste', this.handlePasteEvent)
  }
}
