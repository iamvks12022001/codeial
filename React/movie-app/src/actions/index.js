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

export function addMovies(movies)
{
    return {
        type:ADD_MOVIES,
        movies:movies
    }
}
