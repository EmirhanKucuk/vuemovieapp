import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@fortawesome/fontawesome-free';
import api from "../services/movieApi";
Vue.use(Vuetify);
Vue.prototype.$http = api;
export default new Vuetify({
    icons:{
        iconfont:'md' || 'fa'
    }
});
