// Vue
import Vue from 'vue'
import App from './App'
import { Image } from 'jintu-ui'
import 'jintu-ui/lib/theme-chalk/index.css'

Vue.use(Image)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
