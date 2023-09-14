import config from './config.js'

const longDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const newDate = new Date(date)
  return newDate.toLocaleDateString(undefined, options)
}

/**
 * Limit the number of elements in an array
 * @param {array} collection Array to be limited
 * @param {number} amount Number of elements to return
 * @returns {array} Returns the first <amount #> elements from the collection
 */
const limit = (collection, amount) => {
  return collection.filter((_, index) => index < amount)
}

/**
 * Sorts an array
 * @param {string[] | object[]} collection Array to be sorted
 * @param {string} field If object[ ], include the key name to sort by, or if string[ ], undefined or ' '
 * @param {string} direction Sort direction <'ascending' | 'descending'>
 * @returns {array} Returns sorted collection, or the unchange collection if not sortable
 */
const sort = (collection, field = '', direction = 'ascending') => {
  if (!Array.isArray(collection)) return collection
  if (!field && direction === 'ascending') return collection.sort()
  if (!field && direction === 'descending') return collection.reverse()
  if (field && direction === 'ascending')
    return collection.sort((a, b) => a[field] - b[field])
  if (field && direction === 'descending')
    return collection.sort((a, b) => a[field] - b[field])
  return collection
}

const asset = (pathname) => {
  let pName = pathname
  if (config.assetsDir) pName = `${config.assetsDir}/${pName}`
  if (config.absoluteHrefs && pName[0] !== '/') pName = `/${pName}`
  if (!config.absoluteHrefs && pName[0] === '/') pName = pName.replace('/', '')
  return pName
}

export default { longDate, limit, sort, asset }
