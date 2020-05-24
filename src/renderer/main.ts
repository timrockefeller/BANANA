import Vue from 'vue'
// import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
import event from './utils/command'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css';

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
Vue.use(iView);
Vue.use(VueCodemirror/*,{
    options: { theme: 'base16-dark'},
    events: ['scroll']
  }*/)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
