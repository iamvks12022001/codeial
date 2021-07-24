import { combineReducers } from "redux";

import { ADD_MOVIES,ADD_TO_FAVOURITE,REMOVE_FROM_FAVOURITES,SET_SHOW_FAVOURITES } from "../actions";


const initialMoviesState={
    list:[],
    favourites:[],
    showFavourites:false
}
export  function movies(state=initialMoviesState,action){
    // if(action.type===ADD_MOVIES)
    // {
    //     return {
    //         ...state, list:action.movies

    //     };
    // }
    // return state;
    // we can use if else but generally switch case is used
    console.log(action.type,"<->",state);//action me gatbage value jaega
    switch(action.type)
    {
        case ADD_MOVIES:
            return {
                ...state,
                list:action.movies
            }
        case ADD_TO_FAVOURITE:
            return {
                ...state,
                favourites:[action.movie,...state.favourites]
            }
        case REMOVE_FROM_FAVOURITES:
            const filteredArray=state.favourites.filter(
                movie=>movie.Title !==action.movie.Title
            );
            return{
                ...state,
                favourites:filteredArray
            }
        case SET_SHOW_FAVOURITES:
            return{
                ...state,
                showFavourites:action.val
            }
        default:
            return state;
    }
}

const initialSearchState={
    result:{}
};

export function search(state=initialSearchState,action)
{
    //define search reduces by the action passed here
    //we dont't have any case her now

    return state;
}

// const initialRootState={
//     movies:initialMoviesState,
//     search:initialSearchState
//     //user:initialUserState,
//     //similary add all the initial state of all reducers

// }

// export default function rootReducer(state=initialRootState,action)
// {
//     return{
//         movies:movies(state.movies,action),
//         search:search(state.search,action)
//         //user:userReducers(state.userReducer,action)
//         //similarly pass all respective reducers function
//     }
// }

export default combineReducers({
   movies:movies,
   search:search
   //just passing the reference of reducers
});