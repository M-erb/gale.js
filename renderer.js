const fse = require('fs-extra')
const path = require('path')
const Helpers = require('./helpers')
const nunjucks = require('./nunjucks.config')()
const webpack = require('webpack')
const webpackConfig = require('./client/webpack.config.js')
const prettyHtml = require('pretty')
const config = require('./config')

const renderer = {
  async html(url, buildFolder, hostURL) {
    return new Promise((resolve, reject) => {
      let name = url === '/' ? 'home' : url.endsWith('/') ? url.trim().toLowerCase().slice(0, url.length - 1) : url.trim().toLowerCase()
      name = name.startsWith('/') ? name.trim().toLowerCase().slice(1) : name.trim().toLowerCase()

      const template = /blog\/page\d+\/$/gm.test(url) ? 'blog/pages.njk' : /blog\/[a-zA-Z0-9]/gm.test(url) ? 'blog/template.njk' : name + '.njk'
      const outPutDir = name === 'home' ? '' : '/' + name

      const vm = {
        host: config.host,
        path: url,
        siteURLs: config.siteURLs
      }

      nunjucks.render(template, vm, (err, view) => {
        if (!err) {
          const cleanedView = prettyHtml(view, {ocd: true})
          const filePath = path.join(__dirname, buildFolder, outPutDir, '/index.html')
          fse.outputFileSync(filePath, cleanedView)
          return resolve(url)
        } else {
          console.log('err: ', err)
          const error = {
            info: err,
            url
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

module.exports = renderer
