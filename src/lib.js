function alreadyLoaded (url) {
  return (document.head.querySelector(`script[src="${url}"]`) !== null)
}

function promiseLoader (url) {
  if (alreadyLoaded(url)) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.defer = true
    script.async = true
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

function callbackLoader (url, callback) {
  promiseLoader(url).then(() => {
    callback(null)
  }).catch(err => {
    callback(err)
  })
}

export function loadScript (url, callback) {
  if (typeof callback === 'function') return callbackLoader(url, callback)
  else return promiseLoader(url)
}

export default {
  install (Vue, options) {
    Vue.prototype.$loadScript = loadScript
  }
}
