import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router.js'

Vue.use(Router)

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
