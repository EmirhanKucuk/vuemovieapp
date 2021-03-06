import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueStarRating from 'vue-star-rating';
Vue.config.productionTip = false
Vue.component('star-rating', VueStarRating.default);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
