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
export const ADD_FAVOURITE='ADD_FAVOURITE';

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
        type:ADD_FAVOURITE,
        movie:movie
    }
}
