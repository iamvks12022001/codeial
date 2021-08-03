
import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
import { connect } from 'react-redux';


console.log("inside App.js file");
class App extends React.Component {


  componentDidMount() {
    // make api call to add movies to store
    //dipatch call
   
   
    this.props.dispatch(addMovies(data));
    console.log('STATE', this.props);
  }
  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const { favourites } = movies;

    const index = favourites.indexOf(movie);
    if (index !== -1) {
      //we found the movie
      console.log("trueeeeeee");
      return true;
    }
    // we not find the movie
    console.log("falseeeee");
    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  }
  render() {
    console.log("render");
    const { movies, search } = this.props;
    const { list, favourites, showFavourites } = movies;//now get the object
    const displayMovies = showFavourites ? favourites : list;
    return (
      
            <div className="App">
              <Navbar  search={search} /> {/* //search=this.props.store.getState().search; */}
              <div className="main">
                <div className="tabs">
                  <div className={`tab ${showFavourites ? '' : ' active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
                  <div className={`tab ${showFavourites ? ' active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
                </div>

                <div className="list">
                  {displayMovies.map((movie, index) => (
                    <MovieCard movie={movie} key={`movies-${index}`} dispatch={this.props.dispatch}
                      isFavourite={this.isMovieFavourite(movie)} /> //passing as the props
                    //we are calling the funcrtion so that mean isfavourite is either true or false
                  ))}
                  {/* //key is passed just to remove warning */}
                </div>
                {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null}
              </div>
            </div>
        
       
    );

  }
}

// class AppWrapper extends React.Component{
//   render(){
      
//     return(
//       <StoreContext.Consumer>
//         {(store)=> <App store={store}/>}
//       </StoreContext.Consumer>
//     )
//   }
// }
function mapStateToProps(state){
  return{
    movies:state.movies,
    search:state.movies,
  };
}
//this function mapStateToProps return all the data that we need to pass to App as props
const connectedAppComponent=connect(mapStateToProps)(App);
//first argument is function specify which data to return and second component
//specify which class to pass this data as a props
//and now export the return component to index.js src
//and pls note if we make changes  in data which we passed(connect) then and then only class App re render alse not
export default connectedAppComponent;
