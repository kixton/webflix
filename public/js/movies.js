var urls = {
  nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?api_key=',
  popular: 'https://api.themoviedb.org/3/movie/popular?api_key=',
  top_rated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=',
  upcoming: 'https://api.themoviedb.org/3/movie/upcoming?api_key=',
  singleMovieInfo: 'https://api.themoviedb.org/3/movie/'
};

var imgSize = {
  img92: 'https://image.tmdb.org/t/p/w92/',
  img130: 'https://image.tmdb.org/t/p/w130/',
  img185: 'https://image.tmdb.org/t/p/w185/',
  img396: 'https://image.tmdb.org/t/p/w396',
  img500: 'https://image.tmdb.org/t/p/w500/',
};

var getMovies = function(url, divClass, title) {
  // clear div and title; change active link
  $(".movie-thumb").empty();
  $('li').removeClass('active-nav-link');

  $.get(url, function(data) {
    var movieData = data;
    
    // load initial main movie
    var singleMovieId = movieData.results[3].id;
    var url1 = urls.singleMovieInfo + singleMovieId + "?api_key=" + APIKEY;
    var url2 = urls.singleMovieInfo + singleMovieId + "/videos?api_key=" + APIKEY;

    getMovieInfo(url1, url2);

    $.each(movieData.results, function(index, movie) {
      if (movie.poster_path === null || movie.poster_path === "") {
        movie.poster_path = 'https://m.rgbimg.com/cache1nToqD/users/g/gr/greekgod/600/mlns11c.jpg';  
      } // end of "if"
      else {
        movie.poster_path = imgSize.img396 + movie.poster_path;
        var source = $("#movie-collection-template").html();
        var template = Handlebars.compile(source);
        var myNewHTML = template(movie);
        $(".movie-thumb").append(myNewHTML);
      } // end of "else"
    }); // end of "each"

    $(".movie-thumb").unslick();
    $(".movie-thumb").slick({
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
};

var getMovieInfo = function(url1, url2) {

  $.get(url1, function(data) {
    // clear out single movie
    $("#movie-main-summary").empty();
    $(".youtube").attr("src", "");

    data.poster_path = imgSize.img396 + data.poster_path;
    if (data.overview.length > 500) {
      data.overview = data.overview.substring(0, 525) + "....Continued";
    }

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
  mixpanel.track("Upcoming movies");
  getMovies(urls.upcoming + APIKEY, 'upcoming', 'Upcoming Movies');
  $(this).addClass('active-nav-link');
});

var APIKEY = '5cd09754dc5adf93823bd7db20da902d';

$(document).ready( function() {
  var movieId;
  getMovies(urls.nowPlaying + APIKEY, 'currently_playing', 'Currently Playing Movies');
  
  $(".currently_playing").addClass('active-nav-link');

  mixpanel.track("Landing page");


  $(".movie-thumb").on("click", ".movies-collection-img", function(data) {
    mixpanel.track("Single movie view");   
    movieId = $(this).attr("data-movie-id");
    var url1 = urls.singleMovieInfo + movieId + "?api_key=" + APIKEY;
    var url2 = urls.singleMovieInfo + movieId + "/videos?api_key=" + APIKEY;
    getMovieInfo(url1, url2);
  });


});
