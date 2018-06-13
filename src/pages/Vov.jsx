import PictureList from '../components/PictureList'
import VovDragger from '../components/VovDragger'
import Loading from '../components/Loading'
import isBlobURL from '../utils/isBlobURL'
import Snag from '../components/Snag'
import classNames from 'classnames'
import token from '../utils/token'
import '../styles/vov.scss'
import React from 'react'

export default class Vov extends React.Component {
  state = {
    picture: undefined,
    cancel: undefined
  }

  setPicture = url => {
    const picture = { [isBlobURL(url) ? 'blob' : 'url']: url, token: token.token }
    this.setState({ picture })
  }

  replacePictureURL = url => {
    this.setState(({ picture }) => {
      return Object.assign(picture, { url })
    })
  }

  storeUploadCancel = cancel => {
    this.setState({ cancel })
  }

  onRemovePicture = () => {
    const { state: { cancel } } = this
    if (cancel) cancel()
    this.setState({ picture: undefined })
  }

  render () {
    const { state, setPicture, replacePictureURL, onRemovePicture, storeUploadCancel } = this
    const { picture, picture: { url } = {} } = state

    const Picture = (
      <Loading loading={!url || url.length === 0}>
        <PictureList
          pictures={[picture]}
          onRemovePicture={onRemovePicture}
          remove />
      </Loading>
    )

    return (
      <section className="vov">
        <VovDragger
          className={classNames({ 'hidden': picture })}
          replacePictureURL={replacePictureURL}
          storeUploadCancel={storeUploadCancel}
          setPicture={setPicture} />

        {picture && Picture}

        <Snag
          setPicture={setPicture}
          storeUploadCancel={storeUploadCancel}
          replacePictureURL={replacePictureURL} />
      </section>
    )
  }
}
