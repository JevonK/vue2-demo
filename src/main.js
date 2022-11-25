import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import './plugins/axios.js'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
