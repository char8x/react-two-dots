const getDebugger = () => {
  const debug = require('debug') // eslint-disable-line global-require
  debug.enable('rtd:*')
  return debug
}

export default getDebugger()
