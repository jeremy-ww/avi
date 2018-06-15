const RenameWebpackPlugin = require('rename-webpack-plugin')
const { name, description } = require('./package.json')
const OfflinePlugin = require('offline-plugin')
const config = require('./config')

class GithubPagesWebpackPlugin {
  apply (compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      compilation.assets['404.html'] = compilation.assets['index.html']
      callback()
    })
  }
}

const RELEASE_TIME = Date.now()

module.exports = (options, req) => ({
  port: 80,
  entry: './src/main.js',
  env: {
    RELEASE_TIME,
    ...config
  },
  babel: {
    cacheDirectory: true,
    presets: [
      [require.resolve('babel-preset-poi'), { jsx: 'react' }]
    ]
  },
  presets: [
    require('poi-preset-react')()
  ],
  webpack (config) {
    config.plugins.push(new RenameWebpackPlugin({
      originNameReg: /locales\/(.*)\/(.*)\.json/g,
      targetName: `locales/$1/$2.${RELEASE_TIME}.json`
    }))
    config.plugins.push(new GithubPagesWebpackPlugin())
    config.plugins.push(new OfflinePlugin())
    return config
  },
  html: {
    title: `${name.replace(/[a-z]/, str => str.toUpperCase())} - ${description}`,
    template: './static/index.html',
    minify: {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true
    }
  }
})
