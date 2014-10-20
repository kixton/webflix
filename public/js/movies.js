
var APIKEY = '5cd09754dc5adf93823bd7db20da902d';
var urls = {
  nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?api_key=',
  popular: 'https://api.themoviedb.org/3/movie/popular?api_key=',
  upcoming: 'https://api.themoviedb.org/3/movie/upcoming?api_key=',
  top_rated: 'https://api.themoviedb.org/3/movie/upcoming?api_key=',
  singleMovieInfo: 'https://api.themoviedb.org/3/movie/'
};

var imgSize = {
  img92: 'http://image.tmdb.org/t/p/w92/',
  img185: 'http://image.tmdb.org/t/p/w185/',
  img130: 'https://image.tmdb.org/t/p/w130/',
  img500: 'https://image.tmdb.org/t/p/w500'
};

var getMovies = function(url, divClass, title) {

  // clear divs
  // class "active"


  $.get(url, function(data) {
    console.log(data)

    var movieData = data;
    
    $.each(movieData.results, function(index, movie) {

      if (movie.poster_path === null || movie.poster_path == "") {
        movie.poster_path = 'http://m.rgbimg.com/cache1nToqD/users/g/gr/greekgod/600/mlns11c.jpg'
      } // end of if
      else {
        movie.poster_path = imgSize.img185 + movie.poster_path;

        var source = $("#movie-collection-script").html();
        var template = Handlebars.compile(source);
        var myNewHTML = template(movie);

        $(".movie-collection").append(myNewHTML);
      } // end of else
    }) // end of each
  });

};



var getMovieInfo = function(url1, url2) {


  url1 = urls.singleMovieInfo + data-movie-id + "?api_key=" + APIKEY
  ur2 = 

  $.get(url1, function(data) {

    console.log(data)

    // empty movies list & remove active class 
    $('#main-movies-list ul').empty();
    $('#main-movies-list-title').empty();
    $('.main-movies-nav li').removeClass('active');

    // clear out single movie

    data.poster_path = imgSize.img130 + data.poster_path

    var source = $("#movie-detail-template").html();
    var template = Handlebars.compile(source);
    var myNewHTML = template(data); 
    $('#movie-info').append(myNewHTML);

  });

  $.get(url2, function(data) {
    console.log(data)

    $.each(data.results, function(index, videoInfo) {
      videoInfo.key = "https://www.youtube.com/embed/" + videoInfo.key
      $(".youtube").attr("src", videoInfo.key)
    });

  });

};


$(document).ready( function() {
  console.log("document ready");
  getMovies(urls.nowPlaying + APIKEY, 'currently_playing', 'Currently Playing Movies');

  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    responsive:{
      0:{
          items:4,
          nav:true
      },
      760:{
          items:8,
          nav:false
      },
      1000:{
          items:10,
          nav:true,
          loop:false
      }
    }
  })

});

$('.currently_playing').on('click', function() {
  getMovies(urls.nowPlaying + APIKEY, 'currently_playing', 'Currently Playing Movies');
});

$('.popular').on('click', function() {
  getMovies(urls.popular + APIKEY, 'popular', 'Popular Movies');
});

$('.top_rated').on('click', function() {
  getMovies(urls.top_rated + APIKEY, 'top_rated', 'Top Rated Movies');
});

$('.upcoming').on('click', function() {
  getMovies(urls.upcoming + APIKEY, 'upcoming', 'Upcoming Movies');
});

$('.movie-poster').on('click', function() {
  var movieId;
  var movieImg = $(this).css(["data-movie-id"]);
  $.each(movieImg), function(prop, value) {
    movieId = value;
  }
  console.log(movieId)

});


$('.popular').on('click', function(){

  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    responsive:{
      0:{
          items:4,
          nav:true
      },
      760:{
          items:8,
          nav:false
      },
      1000:{
          items:10,
          nav:true,
          loop:false
      }
    }
  })
});


