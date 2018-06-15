import PictureList from '../components/PictureList'
import VovDragger from '../components/VovDragger'
import Loading from '../components/Loading'
import upload from '../stores/upload'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import '../styles/vov.scss'
import React from 'react'

@observer
class Picture extends React.Component {
  static propTypes = {
    onRemovePicture: PropTypes.func,
    token: PropTypes.string
  }

  render () {
    const { props: { token, onRemovePicture } } = this
    const { url, blob } = upload.map[token]
    const isLoading = !url && url !== ''
    return (
      <Loading loading={isLoading}>
        <PictureList
          pictures={[{ url, token, blob }]}
          onRemovePicture={onRemovePicture}
          remove />
      </Loading>
    )
  }
}

@observer
export default class Vov extends React.Component {
  render () {
    const { map, replacePictureURL, storeUploadCancel, onRemovePicture } = upload

    return (
      <section className="vov">
        <VovDragger
          className={classNames({ 'hidden': Object.keys(map).length })}
          replacePictureURL={replacePictureURL}
          storeUploadCancel={storeUploadCancel}
          setPicture={upload.setPicture} />

        {Object.keys(map)
          .map(token => <Picture token={token} onRemovePicture={onRemovePicture} key={token} />)}
      </section>
    )
  }
}
