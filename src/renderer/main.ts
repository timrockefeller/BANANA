import Vue from 'vue'
// import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
import event from './utils/command'

declare var process: {
  env: {
    NODE_ENV: string,
    IS_WEB: boolean
  }
}

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(event)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
