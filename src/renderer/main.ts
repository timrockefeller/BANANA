import Vue from 'vue'
// import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './stores'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

/**
 *  codemirror
 *  */
// import CodeMirror from 'codemirror'
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

Vue.use(iView);
Vue.use(VueCodemirror/*,{
    options: { theme: 'base16-dark', mode:'python'},
    events: ['scroll']
  }*/)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
