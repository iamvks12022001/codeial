
import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies } from '../actions';

class App extends React.Component {

  componentDidMount(){
    // make api call to add movies to store
    //dipatch call
    console.log("CDM");
    const { store }=this.props;
    store.subscribe(()=>{
       console.log("UPDATED" ,this.props.store.getState());
       this.forceUpdate(); // always try to not use this function
    })
    store.dispatch(addMovies(data));
    console.log('STATE',this.props.store.getState());
  }
  isMovieFavourite=(movie)=>{
    const {favourites}=this.props.store.getState();

    const index=favourites.indexOf(movie);
    if(index!==-1)
    {
      //we found the movie
      console.log("trueeeeeee");
      return true;
    }
  // we not find the movie
  console.log("falseeeee");
    return false;
  }
  render(){
    console.log("render");
  const {list}=this.props.store.getState();//now get the object
  return (
    <div className="App">
     <Navbar/>
     <div className="main">
       <div className="tabs">
          <div className="tab">Movies</div>
          <div className="tab">Favourites</div>
       </div>

       <div className="list">
         {list.map((movie,index)=>(
           <MovieCard movie={movie} key={`movies-${index}`} dispatch={this.props.store.dispatch}
           isFavourite={this.isMovieFavourite(movie)}/> //passing as the props
           //we are calling the funcrtion so that mean isfavourite is either true or false
         ))}
         {/* //key is passed just to remove warning */}
       </div>
     </div>
    </div>
  );
  }
}

export default App;
