// {
//     type:'Increase_Count'
// }
// {
//     type:'Decrease_Count'
// }

// {
//     type:'Add Movies'
// }

//action type

export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";
console.log("inside action");
//action creator
export function addMovies(movies) {
  console.log("inside action function");
  return {
    type: ADD_MOVIES,
    movies: movies,
  };
}

export function addFavourites(movie) {
  return {
    type: ADD_TO_FAVOURITE,
    movie: movie,
  };
}

export function removeFromFavourites(movie) {
  return {
    type: REMOVE_FROM_FAVOURITES,
    movie,
  };
}

export function setShowFavourites(val) {
  return {
    type: SET_SHOW_FAVOURITES,
    val,
  };
}

export function addMovieToList(movie) {
  return {
    type: ADD_MOVIE_TO_LIST,
    movie,
  };
}

export function addMovieSearchResult(movie) {
  console.log("m222=>", movie);
  return {
    type: ADD_SEARCH_RESULT,
    movie: movie,
  };
}
export function handleMovieSearch(movie) {
  const url = `http://www.omdbapi.com/?apikey=3ca5df7&t=${movie}`;
  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("respon", response);
        //dispatch an action to add movie in list but for this we need dispatch function
        dispatch(addMovieSearchResult(response));
      });

    console.log("mmmmm=>", movie); //yaha pe movie ka mtlb jo argument pass kiya ho function me naki jo api dia ha

    //note upar wala asynchronous function ha isliya then ke andar dispatch likho naki yaha;
  };
}
