import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

let methods = {
  searchShows: function(thisVar) {
    let query = document.getElementById('query').value;
    let that = this;
    this.shows = [];
    thisVar.$http.get(`https://api.tvmaze.com/search/shows?q=${query}`)
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
  setShow: function(show) {
    this.selected = true;
    this.show = show;
  },
  // searchPreview: function(query) {
  //   query = document.getElementById('query').value;
  // },
  ///// from show.vue
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
};

export default methods;
