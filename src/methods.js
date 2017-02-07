module.exports = {
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
