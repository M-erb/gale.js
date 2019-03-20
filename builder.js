const fse = require('fs-extra')
const path = require('path')
const Helpers = require('./helpers')
const nunjucks = require('./nunjucks.config')()
const webpack = require('webpack')
const webpackConfig = require('./client/webpack.config.js')

const builder = {
  async html(url, buildFolder, hostURL) {
    return new Promise((resolve, reject) => {
      let name = url === '/' ? 'home' : url.endsWith('/') ? url.trim().toLowerCase().slice(0, url.length - 1) : url.trim().toLowerCase()
      name = name.startsWith('/') ? name.trim().toLowerCase().slice(1) : name.trim().toLowerCase()
      const template = name + '.njk'
      const outPutDir = name === 'home' ? '' : '/' + name
      const vm = {}

      const pageURL = hostURL ? `${hostURL}${url}` : url

      nunjucks.render(template, vm, (err, view) => {
        if (!err) {
          const filePath = path.join(__dirname, buildFolder, outPutDir, '/index.html')
          fse.outputFileSync(filePath, view)
          return resolve(pageURL)
        } else {
          const error = {
            info: err,
            pageURL
          }
          return reject(error)
        }
      })
    })
  },
  async assets(buildFolder) {
    const buildDir = path.join(__dirname, buildFolder, '/assets')
    const config = webpackConfig[0]
    
    // Update config
    config.output.path = buildDir
    config.mode = 'production'

    // console.log(Helpers.cc.reset, 'config: ', config.mode)
    webpack(config, (err, stats) => {
      if (err) {
        return console.error(Helpers.cc.bgRed, err, Helpers.cc.reset)
      }

      console.log(Helpers.cc.reset, stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true    // Shows colors in the console
      }))
    })
  }
}

module.exports = builder
