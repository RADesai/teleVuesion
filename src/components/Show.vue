<template>
  <div id='show'>
    <!-- <div class="container"> -->
      <div class="row">
        <div class="col-sm-8 col-sm-offset-1">
          <div class="head">
            <br>
            <h1>{{ this.details.name }}</h1>
            <div v-html="this.details.summary || this.gotShow.summary"></div>
          </div>
          <div class="display">
            <!-- <button @click="getDetails" class="btn btn-default">Get details</button> -->
            <br>
          </div>
          <br>
        </div>
        <div class="col-sm-2">
          <br>
            <img vi-f="this.images" :src="this.images.medium" class="show">
          <br>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-1">

        </div>
        <div class="sidebar col-sm-3">
          Genres: {{ this.genres || this.gotShow.genres }}
          <br>
          Language: {{ this.details.language || this.gotShow.language }}
          <br>
          Runtime: {{ this.details.runtime || this.gotShow.runtime }} mins
          <br>
          Status: {{ this.details.status || this.gotShow.status }}
          <br>
          Network: {{ this.network }}
          <br>
          Premier Date: {{ this.details.premiered || this.gotShow.premiered }}
          <br>
          <a v-bind:href="`http://tvmaze.com/shows/${this.maze}`" target="_blank">TVmaze</a>
          <br>
          <a v-bind:href="`http://www.imdb.com/title/${this.links.imdb}/`" target="_blank"><i class="fa fa-imdb" aria-hidden="true"></i></a>
          <br>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-11 col-sm-offset-1 header">
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
        <div class="col-xs-10 col-xs-offset-1 col-sm-11 col-sm-offset-1">
          <br>
          <div class="shows" v-for="show in shows">
            <!-- <router-link :to="`show/${show.id}`" :show="show">{{ show.name }}<img :src="show.image.medium" class="show"></router-link> -->
            <img @click="setShow(show)" :src="show.image.medium" height="200" class="show">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
          <div class="container-fluid">
            This app was made with Vue, Node, && Express, please feel free to contribute your own ideas at
            <a v-bind:href="'https://github.com/RADesai/teleVuesion'" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
  export default {
    name: 'show',
    ready: function() {
      console.log('ready');
    },
    data() {
      return {
        shows: [],
        gotShow: {},
        images: {},
        genres: [],
        links: {},
        network: '',
        maze: '',
        details: {
          language: '', //
          name: '', //
          premiered: '', //
          rating: {},
          runtime: '', //
          schedule: {},
          status: '', //
          summary: '', //
        }
      }
    },
    props: ['show'],
    mounted() {
      this.setShow(this.show);
    },
    methods: {
      getDetails: function() {
        console.log('Show:', this.gotShow);
        console.log('Details:', this.details);
      },
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
        this.gotShow = show;
        this.images = this.gotShow.image || false;
        this.genres = this.gotShow.genres || false;
        this.links = this.gotShow.externals || false;
        this.network = this.gotShow.network.name || this.gotShow.webChannel.name || false;
        this.maze = this.gotShow._links.self.href.slice(28) || false;
        for (let detail in this.details) {
          this.details[detail] = this.gotShow[detail];
        }
      }
    }
  }
</script>

<style>
.head {
  font-family: 'Nunito';
  color: #867BCD;
}

.btn {
  color: #867BCD;
}

.sidebar {
  font-family: 'Nunito', sans-serif;
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
  opacity: 0.75;
  text-decoration: none;
  border-color: #FFF;
}
</style>
