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
export const ADD_MOVIES='ADD_MOVIES';
export const ADD_TO_FAVOURITE='ADD_TO_FAVOURITE';
export const REMOVE_FROM_FAVOURITES='REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES='SET_SHOW_FAVOURITES';

//action creator
export function addMovies(movies)
{
    return {
        type:ADD_MOVIES,
        movies:movies
    }
}

export function addFavourites(movie)
{
    return {
        type:ADD_TO_FAVOURITE,
        movie:movie
    }
}

export function removeFromFavourites(movie)
{
    return  {
        type:REMOVE_FROM_FAVOURITES,
        movie
    };
}

export function setShowFavourites(val)
{
    return  {
        type:SET_SHOW_FAVOURITES,
        val
    };
}