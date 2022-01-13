import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap";
import "../node_modules/bootswatch/dist/simplex/bootstrap.min.css";
import "jquery";
import "popper.js";
import moment from 'moment';

Vue.prototype.moment = moment;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
