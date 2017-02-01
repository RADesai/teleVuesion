<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
        <br>
        <div class="head">
          <h2>TVue will help you find the best on TV!</h2>
        </div>
        <br>
        <div class="display">
          <input type="text" v-on:keyup="searchPreview()" v-on:keyup.enter="searchShows()" class="form-control" id="query" placeholder="Search for a show"></input>
        </div>
        <br>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
        <br>
        <div class="shows" v-for="show in shows">
          <img :src="show.image.medium" @click="getShow(show.id)" class="show">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
        <div class="test">
          {{ show }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Show from './components/Show.vue'
  export default {
    name: 'app',
    components: {
      Show
    },
    data() {
      return {
        show: {},
        shows: []
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
      getShow: function(id) {
        this.show = this.shows.filter((show) => {
          return show.id === id;
        })
      }
    }
  }
</script>

<style>
.head {
  font-family: 'Nunito', sans-serif;
}

.shows {
  padding-left: 10px;
  display: inline-block;
}

.show {
  border-radius: 3px;
  margin-bottom: 10px;
}

.test {
  background-color: #FFD877;
  font-family: 'Nunito', sans-serif;
}

</style>
