export default function movies(state=[],action){
    if(action.type='Add_Movies')
    {
        return action.movies;
    }
    return state;
}