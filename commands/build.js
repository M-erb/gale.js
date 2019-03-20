'use strict';
// -------------------
// This build command is to take
// a list of urls and render them
// to HTML.
// -------------------
// **Make sure the server is running before running this.**
// -------------------

// Add all of your site urls here
const siteURLs = [
  '/',
  '/about',
  '/features',
  '/who-we-serve',
  '/support',
  // '/sign-up',
  '/news',
  '/components',
  '/404',
]

// -------------------
// You do not need to edit below this
// -------------------

const Helpers = require('../helpers')
const builder = require('../builder')
const destinationFolder = './builds'

// Get env variables
require('dotenv').config({
  path: './.env'
})

const hostURL = `http://${process.env.HOST || `localhost${':' + process.env.PORT || ''}`}`

siteURLs.forEach(async url => {
  try {
    const result = await builder.html(url, destinationFolder, hostURL)

    console.log(Helpers.cc.bgGreen, `SUCCESS: ${result}`, Helpers.cc.reset)
  } catch (error) {
    console.error(Helpers.cc.bgRed, `ERROR ${error.info.message}: ${error.pageURL}`, Helpers.cc.reset)
  }
})

builder.assets(destinationFolder)
