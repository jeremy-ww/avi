import PropTypes from 'prop-types'
import '../styles/legend.scss'
import React from 'react'

export default class Legend extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
  }

  render () {
    return (
      <section className="legend">
        <aside>
          <h4>{this.props.title}</h4>
        </aside>
        <main>
          {this.props.children}
        </main>
      </section>
    )
  }
}
