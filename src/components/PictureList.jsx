import isBlobURL from '../utils/isBlobURL'
import LazyLoad from 'react-lazy-load'
import '../styles/picture-list.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import copy from '../utils/copy'
import { Icon } from 'antd'
import React from 'react'

export default class PictureList extends React.Component {
  static propTypes = {
    pictures: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onRemovePicture: PropTypes.func,
    children: PropTypes.node,
    remove: PropTypes.bool,
    grid: PropTypes.bool
  }

  removePictureByKey = token => {
    this.props.onRemovePicture(token)
  }

  handleCopyImageUrl = url => {
    if (url && !isBlobURL(url)) copy(url)
  }

  render () {
    const { props: { pictures, grid, children, remove }, removePictureByKey, handleCopyImageUrl } = this
    return (
      <section className={classNames('picture-list', { grid })}>
        {pictures.map(({ url, blob, token }) => {
          return (
            <div key={token}>
              {remove && <Icon onClick={() => { removePictureByKey(token) }} type="delete" />}
              <LazyLoad height={250} offset={100}>
                <img onClick={() => { handleCopyImageUrl(url) }} src={blob || url} alt="" />
              </LazyLoad>
              {children && children(url) }
            </div>
          )
        })}
      </section>
    )
  }
}
