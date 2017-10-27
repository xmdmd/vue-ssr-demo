import portSettings from '../port-settings'
import cdnSettings from '../cdn-settings'

const shared = Object.assign({}, {
  dist: 'build'
}, portSettings)

export default Object.assign({}, shared, cdnSettings)
