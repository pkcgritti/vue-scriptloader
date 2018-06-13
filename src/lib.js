function scriptAlreadyLoaded (url) {
  return (document.head.querySelector(`script[src="${url}"]`) !== null)
}

function linkAlreadyLoaded (href) {
  return (document.head.querySelector(`link[href="${href}"]`) !== null)
}

function getField (options, field) {
  if (typeof options === 'string') return options
  if (!options[field]) throw new Error(`vue-scriptload:Missing ${field} from options`)
  return options[field]
}

function getUrl (options) {
  return getField(options, 'src')
}

function getHref (options) {
  return getField(options, 'href')
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

function configureLink (link, options) {
  if (typeof options === 'string') {
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = options
    link.async = true
  } else {
    const defaults = { rel: 'stylesheet', type: 'text/css', async: true }
    const merge = Object.assign(defaults, options)
    for (let key in merge) {
      link[key] = merge[key]
    }
  }
}

function scriptPromiseLoader (options) {
  const url = getUrl(options)
  if (scriptAlreadyLoaded(url)) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    configureScript(script, options)
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

function linkPromiseLoader (options) {
  const href = getHref(options)
  if (linkAlreadyLoaded(href)) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    configureLink(link, options)
    link.onload = resolve
    link.onerror = reject
    document.head.appendChild(link)
  })
}

function scriptCallbackLoader (options, callback) {
  scriptPromiseLoader(options).then(() => {
    callback(null)
  }).catch(err => {
    callback(err)
  })
}

function linkCallbackLoader (options, callback) {
  linkPromiseLoader(options).then(() => {
    callback(null)
  }).catch(err => {
    callback(err)
  })
}

export function loadScript (options, callback) {
  if (typeof callback === 'function') return scriptCallbackLoader(options, callback)
  else return scriptPromiseLoader(options)
}

export function loadLink (options, callback) {
  if (typeof callback === 'function') return linkCallbackLoader(options, callback)
  else return linkPromiseLoader(options)
}

export default {
  install (Vue, options) {
    Vue.prototype.$loadScript = loadScript
    Vue.prototype.$loadLink = loadLink
  }
}
