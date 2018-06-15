import PropTypes from 'prop-types'
import '../styles/grant.scss'
import React from 'react'

export default function GrantAuthorizationButton ({ children }) {
  return (
    <div className="auth">
      <div align="center">
        {children}
      </div>
    </div>
  )
}

GrantAuthorizationButton.propTypes = {
  children: PropTypes.node
}
