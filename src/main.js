import '@/assets/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseUI from "./baseUI";
import { request, Get, Post, Put, Delete, Download } from './service/index'

import Vue from 'vue'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.prototype.$http = request
Vue.prototype.$Get = Get
Vue.prototype.$Post = Post
Vue.prototype.$Put = Put
Vue.prototype.$Delete = Delete
Vue.prototype.$Download = Download

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(BaseUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
