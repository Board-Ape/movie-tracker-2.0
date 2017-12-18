/*eslint-disable camelcase*/

import FetchMovieActions from './FetchMovieActions';

export { FetchMovieActions };

// export const moviesHasErrored = () => {
//   return {
//     type: 'MOVIES_HAS_ERRORED'
//   };
// };

// export const moviesIsLoading = () => {
//   return {
//     type: 'MOVIES_IS_LOADING'
//   };
// };

// export const moviesFetchDataSuccess = (movies) => {
//   return {
//     type: 'MOVIES_FETCH_DATA_SUCCESS',
//     movies
//   };
// };

// export const fetchMovieList = (url) => {
//   return (dispatch) => {
//     dispatch(moviesIsLoading(true));
//     fetch(url)
//       .then((response) => {
//         if (!response.ok) {
//           throw Error(response.statusText);
//         }
//         dispatch(moviesIsLoading());
//         return response;
//       })
//       .then((response) => response.json())
//       .then((items) => dispatch(moviesFetchDataSuccess(items)))
//       .catch(() => dispatch(moviesHasErrored()));
//   };
// };

export const signInAttempt = (email, password) => {
  return async (dispatch) => {
    const initialResponse = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (initialResponse.status >= 400) {
      return dispatch(signInFailure('user not found'));
    }

    const userData = await initialResponse.json();

    return dispatch(signInAndFavorites(userData));
  };
};

export const signInAndFavorites = (userObject) => {
  return async dispatch => {
    await dispatch(signInSuccess(userObject));
    return await dispatch(updateFavorites(userObject.data.id));
  };
};


export const signInSuccess = (userObject) => {
  return {
    type: 'SIGNIN_SUCCESS',
    userObject
  };
};

export const signInFailure = (errorMessage) => {
  return {
    type: 'SIGNIN_FAILURE',
    errorMessage
  };
};

export const signOutEmptyFavorites = () => {
  return async dispatch => {
    await dispatch(signOut());
    await dispatch(emptyFavorites());
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  };
};

export const signUpAttempt = (name, email, password) => {
  return async (dispatch) => {
    const initialResponse = await fetch('/api/users/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, email, password
      })
    });
    if (initialResponse.status > 400){
      const responseError = await initialResponse.json();
      const errorRegex = new RegExp(/.+\)=/, 'g');
      const formatError = responseError.error.replace(errorRegex, '');

      return dispatch(signUpFailure(formatError));
    } else {
      const newUserId = await initialResponse.json();

      return dispatch(signUpSuccess(newUserId.id));
    }
  };
};

export const signUpFailure = (error) => {
  return {
    type: "SIGN_UP_FAILURE",
    error
  };
};

export const signUpSuccess = async (id) => {
  const allUsers = await fetch('/api/users');
  const userData = await allUsers.json();
  const newUser = await userData.data.find( user => user.id === id);
  return {
    type: "SIGN_UP_SUCCESS",
    newUser
  };
};

export const addFavorite = (movie, id) => {
  return async (dispatch) => {
    await fetch('/api/users/favorites/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movie_id: movie.id,
        user_id: id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview })
    });
    return dispatch(updateFavorites(id));
  };
};

export const removeFavorite = (movie, userId) => {
  return async (dispatch) => {
    const newId = movie.movie_id ? movie.movie_id : movie.id;
    await fetch(`/api/users/${userId}/favorites/${newId}`, {
      method: 'DELETE',
      body: JSON.stringify({ movie_id: newId, user_id: userId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return dispatch(updateFavorites(userId));
  };
};


export const updateFavorites = async (userId) => {
  const updateFavorites = await fetch(`/api/users/${userId}/favorites`);
  const initialResponse = await updateFavorites.json();
  const favoritesData = await initialResponse.data;
  return {
    type: 'UPDATE_FAVORITES',
    favoritesData
  };
};

export const emptyFavorites = () => {
  return {
    type: 'EMPTY_FAVORITES'
  };
};
