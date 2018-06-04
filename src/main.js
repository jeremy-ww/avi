import { render } from 'react-dom'
import { message } from 'antd'
import React from 'react'
import './utils/i18next'
import App from './App'
import 'normalize.css'

const app = document.getElementById('app')

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: './' })
  }
}

message.config({
  getContainer: () => app,
  top: 40
})

render(<App />, app)
