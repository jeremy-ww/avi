import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { searchString2Map, isEmpty } from 'sewing'
import { translate } from 'react-i18next'
import { Menu, Icon, Button } from 'antd'
import Records from './pages/Records'
import Setting from './pages/Setting'
import PropTypes from 'prop-types'
import './styles/theme/dark.scss'
import Vov from './pages/Vov'
import React from 'react'
import './app.scss'

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

@translate(['translations'])
export default class App extends React.Component {
  static propTypes = {
    t: PropTypes.func
  }

  state = {
    theme: 'dark',
    themes: ['dark', 'light']
  }

  toggleTheme = theme => {
    const { themes } = this.state
    const index = themes.findIndex(v => v === theme) + 1
    this.setState({ theme: themes[index >= themes.length ? 0 : index] })
  }

  render () {
    const { state: { theme }, props: { t } } = this
    return (
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
        </section>
      </Router>
    )
  }
}
