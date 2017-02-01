<template>
  <div class='container'>
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
        <br>
        <div class='head'>
          <h2>TVue will help you find the best on TV!</h2>
        </div>
        <br>
        <div class='display'>
          <input type='text' v-on:keyup='searchPreview()' v-on:keyup.enter='searchShows()' class='form-control' id="query" placeholder="Search for a show"></input>
        </div>
        <br>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
        <br>
        <div class="shows" v-for="show in shows">
          <img :src='show.image.medium'>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  export default {
    name: 'app',
    data() {
      return {
        shows: []
      }
    },
    methods: {
      searchShows: function() {
        let query = document.getElementById('query').value;
        let that = this;
        console.log('Search submitted @ 39:', query);
        this.shows = [];
        this.$http.get(`http://api.tvmaze.com/search/shows?q=${query}`)
        .then((res) => {
          console.log('Success:', res.body);
          for (var i = 0; i < res.body.length; i++){
            let program = res.body[i].show;
            console.log("Program:", program);
            let image = res.body[i].show.image.medium;
            console.log("Image:", image);
            that.shows.push(program);
          }
          // that.shows.push(res.body);
          // res.body.forEach((showObj) => {
          //   // that.shows.push(showObj.show);
          //   let program = showObj.show;
          //   console.log("Program:", program);
          //   this.shows.push(showObj.show);
          //   // console.log(showObj.show);
          // });
        })
        .catch((err) => {
          console.log('Error:', err);
        });
      },
      searchPreview: function(query) {
        query = document.getElementById('query').value;
        // console.log('Live Search Preview @ 42:', query);
      }
    }
  }
</script>

<style>
/*.container {
  background-color: #FFD877;
}*/

.head {
  font-family: 'Nunito', sans-serif;
}
</style>
