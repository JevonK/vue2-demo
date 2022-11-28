import Vue from 'vue'
import './plugins/service'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
