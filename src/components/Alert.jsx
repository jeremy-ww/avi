import PropTypes from 'prop-types'
import '../styles/alert.scss'
import { Icon } from 'antd'
import React from 'react'

export default class Alert extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <section className="alert">
        <Icon type="info-circle" />
        {this.props.children}
      </section>
    )
  }
}
