import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Root from './Root.vue';
import Show from './components/Show.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Root }
];

let router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  template: `
    <div>
      <router-view class="view"></router-view>
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
          <div class="container-fluid">
            This app was made with Vue, Node, && Express, please feel free to contribute your own ideas here:
            <a v-bind:href="'https://github.com/RADesai/teleVuesion'" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div>
  `
}).$mount('#app');
