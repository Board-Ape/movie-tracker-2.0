export default function FetchMovieActions(url) {
  return dispatch => {

    dispatch({ type: 'MOVIES_IS_LOADING' });

    return fetch(`${url}`)
      .then(res => res.json())
      .then(movies => { 
        return dispatch({ type: 'MOVIES_FETCH_DATA_SUCCESS', payload: movies });
      })
      .catch( () => {
        return dispatch({ type: 'MOVIES_HAS_ERRORED' });
      });

  };
}