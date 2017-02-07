<template>
  <div class="container">
    <div v-if="selected" class="selected">
      <Show :show="show" :shows="shows"></Show>
    </div>
    <div v-if="!selected" class="jumbotron">
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 header">
          <br>
          <div class="head">
            <h2>Search TVue for the best on TV!</h2>
          </div>
          <br>
          <div class="display">
            <input type="text" v-on:keyup.enter="searchShows()" class="form-control" id="query" placeholder="Search for a show"></input>
          </div>
          <br>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
          <br>
          <transition-group name="list" tag="p">
            <div class="shows" v-for="show in shows" v-bind:key="show">
              {{ show.name }}
              <img @click="setShow(show)" :src="show.image.medium" class="show">
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Show from './components/Show.vue';
  export default {
    name: 'app',
    components: {
      Show
    },
    data() {
      return {
        show: {},
        shows: [],
        selected: false
      }
    },
    methods: {
      searchShows: function() {
        let query = document.getElementById('query').value;
        let that = this;
        this.shows = [];
        this.$http.get(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then((res) => {
          res.body.forEach((showObj) => {
            let program = showObj.show;
            let image = showObj.show.image.medium;
            that.shows.push(program);
          });
        })
        .catch((err) => {
          console.log('Error in TVmase Request:', err);
        });
      },
      searchPreview: function(query) {
        query = document.getElementById('query').value;
      },
      setShow: function(show) {
        this.selected = true;
        this.show = show;
      }
    }
  }
</script>

<style scoped>
  .jumbotron {
    background-color: #FFF;
  }

  .header {
    border-radius: 10px;
    border-width: thin;
    border-color: #54acee;
    background-color: #867BCD;
  }

  .head {
    font-family: 'Nunito';
    color: #FFF;
  }

  input {
    color: #867BCD;
  }

  input:focus {
    border: 2px solid #867BCD;
    box-shadow: #867BCD;
  }

  .shows {
    padding-left: 10px;
    display: inline-block;
    text-decoration: none;
    font-family: 'Nunito', sans-serif;
    color: #867BCD;
    transition: all 2s;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-leave-active {
    position: absolute;
  }

  .show {
    border-radius: 10px;
    margin-bottom: 10px;
    text-decoration: none;
    color: #FFD877;
    transition: transform .5s ease;
  }

  .show:hover {
    opacity: 0.75;
    color: #FFD877;
    cursor: pointer;
    transform: scale(0.85);
  }
</style>
