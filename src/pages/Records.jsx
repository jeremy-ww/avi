import PictureList from '../components/PictureList'
import storage from '../storage/pictures'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import '../styles/records.scss'
import React from 'react'

@translate(['translations'])
export default class Records extends React.Component {
  static propTypes = {
    t: PropTypes.func
  }

  state = {
    pictures: storage.pictures
  }

  onRemovePicture = token => {
    const pictures = storage.remove(token)
    this.setState({ pictures })
  }

  render () {
    const { onRemovePicture, state: { pictures }, props: { t } } = this

    return (
      <section className="records">
        {pictures.length
          ? <PictureList
            onRemovePicture={onRemovePicture}
            pictures={pictures}
            remove
            grid>
          </PictureList>
          : <p className="empty">{t('records.empty')}.</p>}
      </section>
    )
  }
}
