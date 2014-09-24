
// $('now-playing').prepend('<ul> class="now-playing-list small-block-grid-2 medium-block-grid-2 large-block-grid-6"/>')

var APIKEY = '5cd09754dc5adf93823bd7db20da902d';
var urls = {
  nowPlaying: "https://api.themoviedb.org/3/movie/now_playing?api_key=",
  popular: "https://api.themoviedb.org/3/movie/popular?api_key=",
  upcoming: "https://api.themoviedb.org/3/movie/upcoming?api_key=",
  top_rated: "https://api.themoviedb.org/3/movie/top_rated?api_key=",
};

var imgSize = {
  img185: 'http://image.tmdb.org/t/p/w185/',
  img130: 'https://image.tmdb.org/t/p/w130/'

};

var getNowPlaying = function(callback) {
  var url = urls.nowPlaying + APIKEY
  $.get(url, function(data) {
    callback(data);
  });
};

var getPopular = function(callback) {
  var url = urls.popular + APIKEY
  $.get(url, function(data) {
    callback(data);
  });
};

var getUpcoming = function(callback) {
  var url = urls.upcoming + APIKEY
  $.get(url, function(data) {
    callback(data);
  });
};

var getUpcoming = function(callback) {
  var url = urls.upcoming + APIKEY
  $.get(url, function(data) {
    callback(data);
  });
};



var getNowPlayingFunction = function() {

  $('#main-movies-list-title').html('Currently Playing');

  getNowPlaying(function(data){

    console.log(data);

    var movieData = data;

    $.each(movieData.results, function(index, movie) {

      if (movie.poster_path === null || movie.poster_path == "") {
        movie.poster_path = ''
        'http://m.rgbimg.com/cache1nToqD/users/g/gr/greekgod/600/mlns11c.jpg'
      }
      else {
        movie.poster_path = imgSize.img185 + movie.poster_path;
      }

      var source = $("#main-movies-list-template").html();
      var template = Handlebars.compile(source);
      var myNewHTML = template(movie);

      $('#main-movies-list ul').append(myNewHTML);
      $('.currently-playing').addClass('active')

    });

  });

};


$(document).ready( function() {

  console.log("document ready");

  getNowPlayingFunction();

});


$('.currently-playing').on('click', function() {
  // empty old movie list and navigation link
  $('#main-movies-list ul').empty();
  $('#main-movies-list-title').empty();
  $('.main-movies-nav li').removeClass('active');

  getNowPlayingFunction();

});

$('.popular').on('click', function() {
  // empty old movie list and navigation link
  $('#main-movies-list ul').empty();
  $('#main-movies-list-title').empty();
  $('.main-movies-nav li').removeClass('active');

  $('#main-movies-list-title').html('Popular');

  getPopular(function(data){

    var movieData = data;
    
    $.each(movieData.results, function(index, movie) {
      if (movie.poster_path === null || movie.poster_path == "") {
        movie.poster_path = ''
        'http://m.rgbimg.com/cache1nToqD/users/g/gr/greekgod/600/mlns11c.jpg'
      }
      else {
        movie.poster_path = imgSize.img185 + movie.poster_path;
      }

      var source = $("#main-movies-list-template").html();
      var template = Handlebars.compile(source);
      var myNewHTML = template(movie);

      $('#main-movies-list ul').append(myNewHTML);
      $('.popular').addClass('active')

      // return index < 13;
    
    });

  });

});


// $("#some-div").click( function() {
//   showMovie();
// });

// var showMovie = function() {
//   $singleMovie = '<div>'
//   $(".main").replaceWith( $singleMovie )
// }

// var getMovies = function(url, title, callback) {

// }

// $('.upcoming').on(click, function() {
//   getMovies(urls.upcoming + APIKEY, 'Upcoming', callback) {

//   }
// })
