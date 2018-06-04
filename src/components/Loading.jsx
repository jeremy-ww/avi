/**
 * Loading Component based on https://codepen.io/willianjusten/pen/QELMgN
 */
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import '../styles/loading.scss'
import React from 'react'

@translate(['translations'])
export default class WrappedCloudStorageForm extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    t: PropTypes.func
  }

  render () {
    const { props: { children, loading, t } } = this

    const Loading = (
      <svg width="200" height="140" viewBox="0 0 40 50">
        <polygon className="triangle" fill="none" stroke="#fff" strokeWidth="1" points="16,1 32,32 1,32" />
        <text className="uploading" x="0" y="45" fill="#fff">{t('upload.tips')}...</text>
      </svg>
    )

    return (
      <section className="loader">
        {children}
        {loading && Loading}
      </section>
    )
  }
}
