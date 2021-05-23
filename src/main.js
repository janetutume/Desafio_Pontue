import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import {routes} from './routes.js';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Buefy);

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
