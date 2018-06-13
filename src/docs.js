import Vue from 'vue'
import Buefy from 'buefy'
Vue.use(Buefy)
import App from './app'

import VueScriptLoader from './lib'
Vue.use(VueScriptLoader)

import './styles/app.scss'
import './styles/app.styl'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
