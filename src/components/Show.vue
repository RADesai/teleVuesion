<template>
  <div id='show'>
    <div class="row">
      <br>
      <div class="col-sm-3 sideSearch">
        <div class="head">
          <h3>Show Search</h3>
        </div>
        <div class="display">
          <input type="text" v-on:keyup.enter="searchShows()" class="form-control" id="query" placeholder="Another show on your mind?" ></input>
        </div>
        <br>
        <transition-group name="list" tag="p">
          <div class="shows" v-for="show in shows" v-bind:key="show">
            <img @click="newShow(show)" :src="show.image.medium" height="175" class="show">
          </div>
        </transition-group>
      </div>
      <div class="col-sm-6 intro">
        <h1>{{ this.details.name }}</h1>
        <div v-html="this.details.summary || this.gotShow.summary"></div>
      </div>
      <div class="col-sm-3 sidebar">
        <img vi-f="this.images" :src="this.images.medium" class="current">
        <hr />
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
  </div>
</template>

<script>
  export default {
    name: 'show',
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
      this.newShow(this.show);
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
          // console.log('Error in TVmase Request:', err);
        });
      },
      searchPreview: function(query) {
        query = document.getElementById('query').value;
      },
      newShow: function(show) {
        this.gotShow = show;
        this.images = this.gotShow.image || false;
        this.genres = this.gotShow.genres || false;
        this.links = this.gotShow.externals || false;
        this.network = this.gotShow.network.name || this.gotShow.webChannel.name || false;
        this.maze = this.gotShow._links.self.href.slice(28) || false;
        for (let detail in this.details) {
          this.details[detail] = this.gotShow[detail];
        }
      },
      cleanShows: function() {
        while (this.shows.length > 10) {
          this.shows.pop();
        }
      }
    }
  }
</script>

<style scoped>
  .sideSearch {
    /*background-color: #CBCBD0;*/
  }

  .head {
    font-family: 'Nunito';
  }

  input {
    color: #867Bcd;
  }

  input:focus {
    border: 2px solid #867BCD;
    box-shadow: #867BCD;
  }

  .shows {
    transition: all 1.5s;
    display: inline-block;
  }
  /*Show List Transitions*/
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-leave-active {
    position: absolute;
  }

  .show {
    margin: 3px;
    border-radius: 5px;
    text-decoration: none;
    color: #867Bcd;
    transition: transform .5s ease;
  }

  .show:hover {
    opacity: 0.65;
    text-decoration: none;
    border-color: #FFF;
    cursor: pointer;
    transform: scale(0.85);
  }

  .intro {
    font-family: 'Nunito';
  }

  .current {
    border-radius: 10px;
  }

  .jumbotron {
    background-color: #FFF;
  }
</style>
