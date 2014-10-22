
var APIKEY = '5cd09754dc5adf93823bd7db20da902d';
var urls = {
  nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?api_key=',
  popular: 'https://api.themoviedb.org/3/movie/popular?api_key=',
  top_rated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=',
  upcoming: 'https://api.themoviedb.org/3/movie/upcoming?api_key=',
  singleMovieInfo: 'https://api.themoviedb.org/3/movie/'
};

var imgSize = {
  img92: 'http://image.tmdb.org/t/p/w92/',
  img185: 'http://image.tmdb.org/t/p/w185/',
  img130: 'https://image.tmdb.org/t/p/w130/',
  img396: 'https://image.tmdb.org/t/p/w396',
  img500: 'https://image.tmdb.org/t/p/w500/',
};

var getMovies = function(url, divClass, title) {

  // clear div and title; change active link
  $("#movie-collection").empty();
  $('li').removeClass('active-nav-link');


  $.get(url, function(data) {

    console.log(data);
    var movieData = data;
    
    // load initial main movie
    var singleMovieId = movieData.results[3].id;
    var url1 = urls.singleMovieInfo + singleMovieId + "?api_key=" + APIKEY;
    var url2 = urls.singleMovieInfo + singleMovieId + "/videos?api_key=" + APIKEY;

    getMovieInfo(url1, url2);


    $.each(movieData.results, function(index, movie) {

      if (movie.poster_path === null || movie.poster_path === "") {
        movie.poster_path = 'http://m.rgbimg.com/cache1nToqD/users/g/gr/greekgod/600/mlns11c.jpg';  
      } // end of if
      else {
        movie.poster_path = imgSize.img130 + movie.poster_path;

        var source = $("#movie-collection-template").html();
        var template = Handlebars.compile(source);
        var myNewHTML = template(movie);
        // $("#movie-collection").append(myNewHTML);
      } // end of else

    }); // end of each
  });
};


var getMovieInfo = function(url1, url2) {

  $.get(url1, function(data) {

    console.log(data);

    // clear out single movie
    $("#movie-main-summary").empty();
    $(".youtube").attr("src", "");

    data.poster_path = imgSize.img396 + data.poster_path;

    data.all_genres = [];
    for (var i = 0; i < data.genres.length; i++) {
      data.all_genres.push(data.genres[i].name);
    }
    data.all_genres = data.all_genres.join(" | ");

    var source = $("#movie-detail-template").html();
    var template = Handlebars.compile(source);
    var myNewHTML = template(data); 
    $("#movie-main-summary").append(myNewHTML);

  });

  $.get(url2, function(data) {
    if (data.results.length === 0) {
      console.log("no video");
    } else {
      videoId = "https://www.youtube.com/embed/" + data.results[0].key;
      $(".youtube").attr("src", videoId);
    }

    // console.log(data.results[0].key);
    // $.each(data.results, function(index, videoInfo) {
    //   videoInfo.key = "https://www.youtube.com/embed/" + videoInfo.key;
    //   $(".youtube").attr("src", videoInfo.key);
    // });

  });

};


$('.currently_playing').on('click', function() {
  getMovies(urls.nowPlaying + APIKEY, 'currently_playing', 'Currently Playing Movies');
  $(this).addClass('active-nav-link');
});

$('.popular').on('click', function() {
  getMovies(urls.popular + APIKEY, 'popular', 'Popular Movies');
  $(this).addClass('active-nav-link');
});

$('.top_rated').on('click', function() {
  getMovies(urls.top_rated + APIKEY, 'top_rated', 'Top Rated Movies');
  $(this).addClass('active-nav-link');
});

$('.upcoming').on('click', function() {
  getMovies(urls.upcoming + APIKEY, 'upcoming', 'Upcoming Movies');
  $(this).addClass('active-nav-link');
});


$(document).ready( function() {

  var movieId;

  getMovies(urls.nowPlaying + APIKEY, 'currently_playing', 'Currently Playing Movies');
  $(".currently_playing").addClass('active-nav-link');

  $(".movie-thumb").click(function(data) {
    console.log("clicked");
  // $("#movie-collection").on("click", ".movies-collection-img", function(data) {
    movieId = $(this).attr("data-movie-id");
    console.log(movieId);

    var url1 = urls.singleMovieInfo + movieId + "?api_key=" + APIKEY;
    var url2 = urls.singleMovieInfo + movieId + "/videos?api_key=" + APIKEY;

    getMovieInfo(url1, url2);

  });


  $('.center').slick({
    centerMode: true,
    centerPadding: '80px',
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    accessibility: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 5
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      }
    ]
  });


});

