// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import 'element-ui/lib/theme-chalk/index.css';
import VueLodash from 'vue-lodash'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui";


Vue.config.productionTip = false
// Vue.use(VueLodash)
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
