import runtime from 'offline-plugin/runtime'
import { render } from 'react-dom'
import { message } from 'antd'
import App from './pages/App'
import React from 'react'
import './utils/i18next'
import 'normalize.css'
import './stores/user'

runtime.install({
  onUpdateReady () {
    console.log('update ready')
    runtime.applyUpdate()
  },

  onUpdated () {
    console.log('updated')
    location.reload()
  }
})

const app = document.getElementById('app')

message.config({
  getContainer: () => app,
  top: 40
})

render(<App />, app)
