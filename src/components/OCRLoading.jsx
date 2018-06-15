import classNames from 'classnames'
import '../styles/ocr-loading.scss'
import PropTypes from 'prop-types'
import React from 'react'

export default function OCRLoading ({ className }) {
  return (
    <section className={classNames(className)}>
      <div className="dl">
        <div className="dl__container">
          <div className="dl__corner--top"></div>
          <div className="dl__corner--bottom"></div>
        </div>
        <div className="dl__square"></div>
      </div>
    </section>
  )
}

OCRLoading.propTypes = {
  className: PropTypes.string
}
