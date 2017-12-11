// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import demoBlock from './components/demo-block.vue'
import ttyUI from '../packages/index'
import '../packages/theme-default/lib/index.css'

// import ttyUI from 'tty-ui'
// import '../node_modules/tty-ui/lib/theme-default/lib/index.css'

Vue.component('demo-block', demoBlock)
Vue.use(ttyUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
