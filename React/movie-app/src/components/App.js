
import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies,setShowFavourites } from '../actions';

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
    const {movies}=this.props.store.getState();
    const {favourites}=movies;

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

  onChangeTab=(val)=>{
    this.props.store.dispatch(setShowFavourites(val));
  }
  render(){
    console.log("render");
    const{movies}=this.props.store.getState();
  const {list,favourites,showFavourites}=movies;//now get the object
  const displayMovies=showFavourites ?favourites:list;
  return (
    <div className="App">
     <Navbar/>
     <div className="main">
       <div className="tabs">
          <div className={`tab ${showFavourites ? '':' active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
          <div className={`tab ${showFavourites ? ' active-tabs':''}`}  onClick={()=>this.onChangeTab(true)}>Favourites</div>
       </div>

       <div className="list">
         {displayMovies.map((movie,index)=>(
           <MovieCard movie={movie} key={`movies-${index}`} dispatch={this.props.store.dispatch}
           isFavourite={this.isMovieFavourite(movie)}/> //passing as the props
           //we are calling the funcrtion so that mean isfavourite is either true or false
         ))}
         {/* //key is passed just to remove warning */}
       </div>
       {displayMovies.length===0 ? <div className="no-movies">No movies to display!</div>:null}
     </div>
    </div>
  );
  }
}

export default App;
