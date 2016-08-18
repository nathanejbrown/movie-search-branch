$('document').ready(function() {
  var allGenres = [];
  var allMovies = [];
  console.log('Sanity check');
  $('form').on('submit', function(event) {
    event.preventDefault();
    var movieTitle = $('#movieSearch').val().split(' ').join('+');
    findMovieWithTitle(movieTitle);
  });

  $('#genreOptions').on('change', function(event) {
    event.preventDefault();
    var selectedGenre = $('select').val();
    if (selectedGenre === 'All Genres') {
      $('.movie').fadeIn(1000);
    }
    else {
    displayOnlyCertainGenres(selectedGenre);
    }
  });


  $('#poster').on('click', 'div', function (event) {
    event.preventDefault();
    var question = "This will delete this movie from the page. Press ok to continue.";
    if (areYouSure(question)) {
      $(this).remove();
    };
  })

  function findMovieWithTitle(movie) {
    $.ajax ({
      url: 'https://www.omdbapi.com/?t=' + movie
    }).done(function(movie) {
      allMovies.push(movie);
      $('#poster').append('<div id="' + movie.imdbID + '" class="col-md-3 text-center movie" style="height:500px"><img src="' + movie.Poster + '"><p>' + movie.Title + '</p></div>');
      $('.well').css('visibility', 'visible');
      var genreArray = movie.Genre.split(', ');
      for (i = 0; i < genreArray.length; i++) {
          if (allGenres.indexOf(genreArray[i]) === -1) {
            $('#genres').append('<option>' + genreArray[i] + '</option>')
            allGenres.push(genreArray[i]);
          }
        }
    }).fail(function(error) {
      console.log(error);
    });
  }

  function areYouSure(message) {
    var okToConfirm = confirm(message);
    if (okToConfirm) {
      return true;
    }
    return false;
  }

  function displayOnlyCertainGenres(genre) {
    for (var i = 0; i < allMovies.length; i++) {
      var genresOfEachMovie = allMovies[i].Genre.split(', ');
        for (var x = 0; x < genresOfEachMovie.length; x++) {
          if (genresOfEachMovie.indexOf(genre) === -1) {
            var movieId = allMovies[i].imdbID;
            $('div#' + movieId).fadeOut(1000);
          }
          else {
            var movieId = allMovies[i].imdbID;
            $('div#' + movieId).fadeIn(1000);
          }
        }
    }
  }
});
