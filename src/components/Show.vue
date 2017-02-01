<template>
  <div id='show'>
    <div class="container">
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
          <br>
          <div class="head">
            <router-link :to="'/'"><button class="btn btn-default">Back to Search</button></router-link>
            <h2>This is show.vue!</h2>
            <h3>{{ msg }}</h3>
          </div>
          <br>
          <div class="display">
            <button @click="getShowDetails" class="btn btn-default">Show details</button>

            {{ show }}
          </div>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var Vue = require('vue');
var VueResource = require('vue-resource');
Vue.use(VueResource);

  export default {
    name: 'show',
    ready: function() {
      console.log('ready');
    },
    data() {
      return {
        msg: 'msg in Show!',
      }
    },
    props: ['show'],
    methods: {
      getShowDetails: function() {
        console.log(window.location);
        console.log('hash:', window.location.hash);
        console.log('sliced:', window.location.hash.slice(7));
      }
      // getStats: function() {
      //   this.$http.get('https://www.mysportsfeeds.com/api/feed/pull/nfl/2016-2017-regular/cumulative_player_stats.json?playerstats=Att,Comp,Yds,TD')
      //   .then((res) => {
      //     console.log('Success:', res);
      //     this.stats = res;
      //   }, (err) => {
      //     console.log('Error:', err);
      //   });
      // }
    }
  }
</script>

<style>

</style>
