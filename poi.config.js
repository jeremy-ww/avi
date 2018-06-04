const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const { name, description } = require('./package.json')

class GithubPagesWebpackPlugin {
  apply (compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      compilation.assets['404.html'] = compilation.assets['index.html']
      console.log(process.env)
      callback()
    })
  }
}

module.exports = (options, req) => ({
  entry: './src/main.js',
  env: {
    RELEASE_TIME: Date.now()
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
    config.plugins.push(new SWPrecacheWebpackPlugin({
      cacheId: name,
      navigateFallback: 'https://avi.run/index.html',
      filename: 'sw.js',
      minify: true
    }))
    config.plugins.push(new GithubPagesWebpackPlugin())
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
