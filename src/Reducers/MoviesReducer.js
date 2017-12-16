

const initialState = {
  movies: [],
  moviesHasErrored: false,
  moviesIsLoading: false
}



const MoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVIES_FETCH_DATA_SUCCESS':
      return action.movies.results;
    case 'MOVIES_HAS_ERRORED':
      return action.hasErrored;
    case 'MOVIES_IS_LOADING':
      return action.isLoading;
    
    default:
      return state;
  }
}

export default movies;

const moviesHasErrored = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVIES_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export default moviesHasErrored;

const moviesIsLoading = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVIES_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export default MoviesReducer;
