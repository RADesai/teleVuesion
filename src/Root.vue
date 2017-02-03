<template>
  <div class="container">
    <div v-if="selected" class="selected">
      <Show :show="show" :shows="shows"></Show>
    </div>
    <div v-if="!selected" class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 header">
        <br>
        <div class="head">
          <h2>Search TVue for the best on TV!</h2>
        </div>
        <br>
        <div class="display">
          <input type="text" v-on:keyup="searchPreview()" v-on:keyup.enter="searchShows()" class="form-control" id="query" placeholder="Search for a show"></input>
        </div>
        <br>
      </div>
    </div>
    <div v-if="!selected" class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
        <br>
        <div class="shows" v-for="show in shows">
          <!-- <router-link :to="`show/${show.id}`" :show="show">{{ show.name }}<img :src="show.image.medium" class="show"></router-link> -->
          {{ show.name }}
          <img @click="setShow(show)" :src="show.image.medium" class="show">
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
        this.$http.get(`http://api.tvmaze.com/search/shows?q=${query}`)
        .then((res) => {
          console.log('Successful Request');
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
        console.log('clicked:', show);
        this.selected = true;
        this.show = show;
      }
    }
  }
</script>

<style scoped>
.container {
  /*background-color: #E3F6F7;*/
  border-width: thin;
  border-radius: 25;
  border-color: #FFD877;
}

.header {
  border-radius: 10px;
  border-width: thin;
  border-color: #54acee;
  background-color: #867bcd;
}

.head {
  font-family: 'Nunito';
  color: #FFF;
}

input:focus {
  border: 2px solid #FFD877;
  box-shadow: #FFD877;
}

.shows {
  padding-left: 10px;
  display: inline-block;
  text-decoration: none;
  font-family: 'Nunito', sans-serif;
  color: #867BCD;
}

.show {
  border-radius: 3px;
  margin-bottom: 10px;
  text-decoration: none;
  color: #FFD877;
}

.show:hover {
  opacity: 0.7;
  color: #FFD877;
  cursor: pointer;
}

.test {
  background-color: #FFD877;
  font-family: 'Nunito', sans-serif;
}

</style>
