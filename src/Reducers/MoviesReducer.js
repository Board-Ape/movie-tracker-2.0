

const initialState = {
  moviesIsLoading: false,
  movies: [],
  moviesHasErrored: false
}



const MoviesReducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case 'MOVIES_IS_LOADING':
      return { ...state,
        moviesIsLoading: true,
        movies: null,
        movieHasErrored: false,
      };

    case 'MOVIES_FETCH_DATA_SUCCESS':
      return { ...state,
        movieIsLoading: false,
        movies: action.movies.results,
        movieHasErrored: false,
      };
    
    case 'MOVIES_HAS_ERRORED':
      return {...state,
        movieIsLoading: false,
        movies: null,
        movieHasErrored: true,
      };
    
    default:
      return state;
  }
}

export default MoviesReducer;
