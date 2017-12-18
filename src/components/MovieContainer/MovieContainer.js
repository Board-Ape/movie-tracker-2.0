import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';
import { FetchMovieActions } from '../../Actions';
import { Link } from 'react-router-dom';
import './MovieContainer.css';
import PropTypes from 'prop-types';

const key = require('../../Utils/key');

class MovieContainer extends Component {

  componentDidMount() {
    this.props.FetchMovieActions(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`
    );
  }

  renderMovies() {
    const location = this.props.location.pathname;
    const movieArray = location === '/favorites' 
      ? this.props.favorites 
      : this.props.movies.movies;

    const movieCardsArray = movieArray.map((movie) => {
      return (<MovieCard key={movie.id}
        poster={movie.poster_path}
        title={movie.title}
        overview={movie.overview}
        rating={movie.vote_average}
        movie={movie} />);
    });
    
    if (
      !this.props.userData.signedIn && 
      location==='/favorites'
    ) {
      return (
        <h3 className="favorites-warning">Please Login 
          <Link to="/signin">Here</Link>
          to add Favorites</h3>
      );
    } else if (
      this.props.userData.signedIn && 
      location==='/favorites' && 
      !movieCardsArray.length
    ) {
      return (
        <h3 className="favorites-warning">
          You don&#39;t have any favorites! Return home
          <Link to="/">here</Link> 
            and add some!</h3>
      );
    }

    return movieCardsArray;
  }

  render() {
    return (
      <section>
        {this.renderMovies()}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    favorites: state.favorites,
    hasErrored: state.moviesHasErrored,
    isLoading: state.moviesIsLoading,
    userData: state.SignIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchMovieActions: (url) => dispatch(FetchMovieActions(url))
  };

};

MovieContainer.propTypes = {
  location: PropTypes.object,
  movies: PropTypes.object.isRequired,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  favorites: PropTypes.array.isRequired,
  FetchMovieActions: PropTypes.func.isRequired,
  userData: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);
