import React from 'react';
import './MovieCard.css'
import { connect } from 'react-redux';
import { toggleFavorites, addFavorite, removeFavorite } from '../../Actions';

const MovieCard = (props) => {
  const handleFavorite = (movie) => {
    if (movie.isFavorite === false) {
      props.addFavorite(movie, props.user.id);
    } else {
      props.removeFavorite(props.user.id, movie.movie_id);
    }
    props.toggleFavorites(movie);
  };

  const checkFavorites = (movie) => {
    if (!props.user.name) {
      alert('You must sign-in to add a favorite');
    } else {
      handleFavorite(movie)
    }
  }

  return (
    <article>
      <img src={`https://image.tmdb.org/t/p/w500${props.poster}`} alt="movie poster" width="290" height="430" />
      <button onClick={(event) => {
        event.preventDefault();
        checkFavorites(props.movie)
      }}>FAVORITE</button>
      <h1>{props.title}</h1>
    </article>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    favorites: state.favorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFavorites: (movie) => dispatch(toggleFavorites(movie)),
    addFavorite: (movie, id) => dispatch(addFavorite(movie, id)),
    removeFavorite: (userId, movieId) => dispatch(removeFavorite(userId, movieId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
