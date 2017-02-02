<template>
  <div id='show'>
    <div class="container">
      <div class="row">
        <!-- <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2"> -->
          <div class="col-sm-8 col-sm-offset-1">
            <div class="head">
              <br>
              <router-link :to="'/'"><button class="btn btn-default">Back to Search</button></router-link>
              <h5>This is show.vue!</h5>
              <h1>{{ this.details.name }}</h1>
              <div v-html="this.details.summary"></div>
            </div>
            <div class="display">
              <!-- <button @click="getDetails" class="btn btn-default">Get details</button> -->
              <br>
            </div>
            <br>
          </div>
          <!-- <div class="col-sm-3">
            <div class="head">
              HEAD
            </div>
            <br>
          </div> -->
          <div class="col-sm-2">
            <br>
              <img vi-f="this.images" :src="this.images.medium" class="show">
            <br>
          </div>
        <!-- </div> -->
      </div>
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-1">
          <br>
            <div class="show">
              Props: {{ show }}
              <br>
              Show: {{ gotShow }}
            </div>
          <br>
        </div>
        <div class="sidebar col-sm-3">
          Language: {{ this.details.language }}
          <br>
          Premier Date: {{ this.details.premiered }}
          <br>
          Runtime: {{ this.details.runtime }}
          <br>
          Status: {{ this.details.status }}
          <br>
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
        details: {
          links: {},
          genres: [],
          language: '',
          name: '',
          network: {},
          premiered: '',
          rating: {},
          runtime: '',
          schedule: {},
          status: '',
          summary: '',
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
.show {
  background-color: #FFD877;
}

.sidebar {
  font-family: 'Nunito', sans-serif;
}
</style>
