
import React from 'react';
import { addFavourites,removeFromFavourites } from '../actions';
class MovieCard extends React.Component {

  handleFavouriteClick=()=>{
    const {movie}=this.props;
    this.props.dispatch(addFavourites(movie))
  }
// dispatch function basically call for change in state....by the function which we pass when we create store i.e movies/
  handleUNFavouriteClick=()=>{
        const{movie}=this.props;
        this.props.dispatch(removeFromFavourites(movie));
  }
  render() {
    const { movie,isFavourite} = this.props;
    return (
      <div className="movie-card">
        <div className="left">
          <img alt="movie-poster" src={movie.Poster} />
        </div>
        <div className="right">
          <div className="title">{movie.Title}</div>
          <div className="plot">{movie.Plot}</div>
          <div className="footer">
            <div className='rating'>{movie.imdbRating}</div>
            {
              isFavourite ? <button className="unfavourite-btn" onClick={this.handleUNFavouriteClick}>UN-Favourite</button>
              :  <button className="favourite-btn" onClick={this.handleFavouriteClick}>Favourite</button>
            }
           {/** after pressing a button ahi wala render function again call hoga as state change ho rha ha */}
          </div>
        </div>

      </div>
    );
  }
}
export default MovieCard;
