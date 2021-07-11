import { ADD_MOVIES,ADD_FAVOURITE } from "../actions";


const initialMoviesState={
    list:[],
    favourites:[]
}
export default function movies(state=initialMoviesState,action){
    // if(action.type===ADD_MOVIES)
    // {
    //     return {
    //         ...state, list:action.movies

    //     };
    // }
    // return state;
    // we can use if else but generally switch case is used

    switch(action.type)
    {
        case ADD_MOVIES:
            return {
                ...state,
                list:action.movies
            }
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites:[action.movie,...state.favourites]
            }
        default:
            return state;
    }
}