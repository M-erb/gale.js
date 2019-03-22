
const Helpers = require('./helpers')

module.exports = () => {
  const nunjucks = require('nunjucks')

  const env = nunjucks.configure('./views', {
    autoescape: true,
    noCache: true
  })

  // -------------------
  // App Global
  // -------------------
  // Add here new values or functions
  // needed in all or many templates
  // of the site.
  // -------------------
  env.addGlobal('app', {
    globals: {},
    server: {
      devMode: process.env.DEV_MODE
    }
  })

  // Merge filter
  // This helps with component creation
  env.addFilter('merge', (item, newItem) => {
    let ItemType = Helpers.getType(item)
    let newItemType = Helpers.getType(newItem)
    let result
    switch (ItemType) {
      case 'String':
        result = item + newItem
        break;
      case 'Array':
        if (newItemType === 'Array') {
          result = item.concat(newItem)
        } else {
          result = item.push(newItem)
        }
      case 'Object':
        if (newItemType === 'Object') {
          result = Object.assign(item, newItem)
        } else {
          result = item
        }
      default:
        break;
    }

    return result
  })

  // No Orphans filter
  env.addFilter('noOrphans', (str, fromNum) => {
    const arr = str.split(' ')
    const lastIndex = arr.length - 1
    const noOrphanFrom = fromNum || 1
    let result = ''
    for (let i = 0; i < arr.length; i++) {
      const word = arr[i]
      if (i < lastIndex - noOrphanFrom) result = result + word + ' '
      else result = result + word + '&nbsp;'
    }
    return result
  })

  return env
}
