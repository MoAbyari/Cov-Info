import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import SuiVue from 'semantic-ui-vue';
Vue.use(SuiVue);

import 'chart.js';



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
