<template>
  <div id='show'>
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-sm-offset-1">
          <div class="head">
            <br>
            <router-link :to="'/'"><button class="btn btn-default">Back to Search</button></router-link>
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
        <div class="col-sm-10 col-sm-offset-1">
          <div id="footer">
            This app was made with Vue, Node, && Express, please feel free to contribute your own ideas at
            <a v-bind:href="'https://github.com/RADesai/teleVuesion'" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div>
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
        msg: 'msg in Show!',
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
      let id = window.location.hash.slice(7);
      this.$http.get(`http://api.tvmaze.com/shows/${id}`)
      .then((res) => {
        console.log('Response:', res.data);
        this.gotShow = res.data;
        this.images = res.data.image || false;
        this.genres = res.data.genres || false;
        this.links = res.data.externals || false;
        this.network = res.data.network.name || res.data.webChannel.name || false;
        this.maze = res.data._links.self.href.slice(28) || false;
        for (let detail in this.details) {
          this.details[detail] = res.data[detail];
        }
      })
      .catch((err) => {
        console.log('Error in TVmase Request:', err);
      });
    },
    methods: {
      getDetails: function() {
        console.log('Show:', this.gotShow);
        console.log('Details:', this.details);
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
</style>
