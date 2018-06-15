import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { searchString2Map, isEmpty } from 'sewing'
import { Provider, observer } from 'mobx-react'
import { translate } from 'react-i18next'
import { Menu, Icon, Button } from 'antd'
import storage from '../utils/storage'
import upload from '../stores/upload'
import Snag from '../components/Snag'
import token from '../utils/token'
import PropTypes from 'prop-types'
import '../styles/theme/dark.scss'
import user from '../stores/user'
import Cookies from 'js-cookie'
import Records from './Records'
import Setting from './Setting'
import '../styles/app.scss'
import React from 'react'
import Vov from './Vov'

@withRouter
class AppMenu extends React.Component {
  static propTypes = {
    t: PropTypes.func,
    toggleTheme: PropTypes.func,
    theme: PropTypes.string,
    location: PropTypes.object
  }

  render () {
    const { location, theme, toggleTheme, t } = this.props
    const selectedKeys = [location.pathname.match(/\/[^/]*/g)[0]]
    const { lng } = searchString2Map(location.search)
    const queryString = !isEmpty(lng) ? `?lng=${lng}` : ''
    Cookies.set('lng', lng, { domain: '.avi.run' })

    return (
      <header>
        <h1 className="logo">
          <Link to={`/${queryString}`} title="Avi">
            Avi
          </Link>
        </h1>

        <section>
          <Menu selectedKeys={selectedKeys} mode="horizontal">
            <Menu.Item key="/">
              <Link to={`/${queryString}`}>
                <Icon type="home" /> {t('menu.home')}
              </Link>
            </Menu.Item>
            <Menu.Item key="/records">
              <Link to={`/records${queryString}`}>
                <Icon type="picture" /> {t('menu.records')}
              </Link>
            </Menu.Item>
            <Menu.Item key="/setting">
              <Link to={`/setting${queryString}`}>
                <Icon type="setting" /> {t('menu.setting')}
              </Link>
            </Menu.Item>
          </Menu>

          <Button
            onClick={() => { toggleTheme(theme) }}
            className="theme-button"
            size="small"
            ghost>
            {t(`menu.theme.${theme}`)} {t('menu.theme.label')}
          </Button>
        </section>
      </header>
    )
  }

  componentDidUpdate ({ location }) {
    const { pathname } = this.props.location
    if (pathname !== location.pathname && window.gtag_spa) {
      window.gtag_spa(pathname)
    }
  }
}

@withRouter
class SnagHOC extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  state = {
    token: undefined
  }

  setPicture = blob => {
    this.props.history.push({
      pathname: '/',
      search: location.search
    })
    upload.clear()
    upload.onRemovePicture(this.state.token)
    this.setState({ token: token.token })
    upload.setPicture(this.state.token, blob)
  }

  render () {
    const { state: { token } } = this
    return (
      <Snag
        setPicture={this.setPicture}
        storeUploadCancel={cancel => { upload.storeUploadCancel(token, cancel) }}
        replacePictureURL={url => { upload.replacePictureURL(token, url) }} />
    )
  }
}

@translate(['translations'])
@observer
export default class App extends React.Component {
  static propTypes = {
    t: PropTypes.func
  }

  state = {
    theme: storage.get('theme', 'light'),
    themes: ['dark', 'light']
  }

  toggleTheme = theme => {
    const { themes } = this.state
    const index = themes.findIndex(v => v === theme) + 1
    const patch = themes[index >= themes.length ? 0 : index]
    this.setState({ theme: patch })
    storage.set('theme', patch)
  }

  render () {
    const { state: { theme }, props: { t } } = this
    return (
      <Provider user={user}>
        <Router>
          <section className={`app ${theme}`}>
            <AppMenu
              toggleTheme={this.toggleTheme}
              theme={theme}
              t={t} />

            <main>
              <Scrollbars>
                <Switch>
                  <Route exact path="/" component={Vov} />
                  <Route path="/records" component={Records} />
                  <Route path="/setting" component={Setting} />
                </Switch>
              </Scrollbars>
            </main>

            <SnagHOC />
          </section>
        </Router>
      </Provider>
    )
  }
}
