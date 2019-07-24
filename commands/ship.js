require('dotenv').config()
const Helpers = require('../helpers')
const execSync = require('child_process').execSync
const shipCommand = process.env.SHIP_COMMAND

shipCommand ? execSync(shipCommand, { stdio: [0, 1, 2] }) : console.log(Helpers.cc.bgRed, Helpers.cc.fgWhite, Helpers.cc.blink, 'WAT??? Could not find a command in .env')
