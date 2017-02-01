<template>
    <div id='player'>
        <h2>This is player.vue!</h2>
        <h3>{{ msg }}</h3>
        <h4>{{ stats }}</h4>
        <button v-on:click="getStats">Get Stats!</button>
    </div>
</template>

<script>
var Vue = require('vue');
var VueResource = require('vue-resource');
Vue.use(VueResource);

  export default {
    name: 'player',
    ready: function() {
      console.log('ready');
      this.getStats();
    },
    data() {
      return {
        msg: 'msg in Player!',
        stats: {}
      }
    },
    methods: {
      getStats: function() {
        this.$http.get('https://www.mysportsfeeds.com/api/feed/pull/nfl/2016-2017-regular/cumulative_player_stats.json?playerstats=Att,Comp,Yds,TD')
        .then((res) => {
          console.log('Success:', res);
          this.stats = res;
        }, (err) => {
          console.log('Error:', err);
        });
      }
    }
  }
</script>

<style>

</style>
