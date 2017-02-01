import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Root from './Root.vue';
import Show from './components/Show.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root
    },
    {
      path: '/*',
      name: 'show',
      component: Show
    }
  ]
});

new Vue({
  router,
  template: '<div><router-view class="view"></router-view></div>'
}).$mount('#app');
