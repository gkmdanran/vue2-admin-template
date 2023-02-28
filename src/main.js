import '@/assets/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseUI from "./baseUI";

import Vue from 'vue'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(BaseUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
