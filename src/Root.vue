<template>
  <div class='container'>
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
        <br>
        <div class='head'>

        </div>
        <br>
        <div class='filter'>
          <input type='text' v-on:keyup='searchPreview()' v-on:keyup.enter='searchShows()' class='form-control' id="query" placeholder="Search for a show"></input>
        </div>
        <br>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-xs-11 col-xs-offset-1  col-sm-6 col-sm-offset-3">
        <div class='footer'>

        </div>
      </div>
    </div>
    <Player></Player>
  </div>
</template>

<script>
  import Player from './components/Player.vue';
  export default {
    name: 'app',
    data() {
      return {}
    },
    methods: {
      searchShows: function(query) {
        query = document.getElementById('query').value;
        console.log('Search submitted @ 39:', query);
      },
      searchPreview: function(query) {
        query = document.getElementById('query').value;
        console.log('Live Search Preview @ 42:', query);
      }
    },
    components: {
      Player
    }
  }
</script>

<style>

</style>
