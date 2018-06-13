function alreadyLoaded (url) {
  return (document.head.querySelector(`script[src="${url}"]`) !== null)
}

function getUrl (options) {
  if (typeof options === 'string') return options
  if (!options.src) throw new Error('vue-scriptload:loadScript needs an url')
  return options.src
}

function configureScript (script, options) {
  if (typeof options === 'string') {
    script.defer = true
    script.async = true
    script.src = options
  } else {
    const defaults = { defer: true, async: true }
    const merge = Object.assign(defaults, options)
    for (let key in merge) {
      script[key] = merge[key]
    }
  }
}

function promiseLoader (options) {
  const url = getUrl(options)
  if (alreadyLoaded(url)) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    configureScript(script, options)
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

function callbackLoader (options, callback) {
  promiseLoader(options).then(() => {
    callback(null)
  }).catch(err => {
    callback(err)
  })
}

export function loadScript (options, callback) {
  if (typeof callback === 'function') return callbackLoader(options, callback)
  else return promiseLoader(options)
}

export default {
  install (Vue, options) {
    Vue.prototype.$loadScript = loadScript
  }
}
