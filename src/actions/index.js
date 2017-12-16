export const moviesHasErrored = () => {
  return {
    type: 'MOVIES_HAS_ERRORED'
  };
};

export const moviesIsLoading = () => {
  return {
    type: 'MOVIES_IS_LOADING'
  };
};

export const moviesFetchDataSuccess = (movies) => {
  return {
    type: 'MOVIES_FETCH_DATA_SUCCESS',
    movies
    };
};

export const fetchMovieList = (url) => {
  return (dispatch) => {
    dispatch(moviesIsLoading());
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
              return response;
            })
        .then((response) => response.json())
        .then((items) => dispatch(moviesFetchDataSuccess(items)))
        .catch(() => dispatch(moviesHasErrored(true)));
  };
};

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
      console.log('failure');
      return dispatch(signInFailure('user not found'));
    }

    const userData = await initialResponse.json();

    return dispatch(signInAndFavorites(userData));
  };
};

export const signInAndFavorites = (userObject) => {
  return async dispatch => {
    await dispatch(signInSuccess(userObject));
    await dispatch(updateFavorites(userObject.data.id));
  }
}


export const signInSuccess = async (userObject) => {
  console.log('in signin');
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


export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  }
}

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
  }
}

export const signUpFailure = (error) => {
  console.log(error);
  return {
    type: "SIGN_UP_FAILURE",
    error
  }
}

export const signUpSuccess = async (id) => {
  const allUsers = await fetch('/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const userData = await allUsers.json();
  const newUser = userData.data.find( user => user.id === id);
  console.log(newUser);
  return {
    type: "SIGN_UP_SUCCESS",
    newUser
  }
}

export const toggleFavorites = (movie) => {
  return{
    type: 'TOGGLE_FAVORITES',
    movie
  }
}

export const showFavorites = (bool) => {
  return {
    type: 'USER_FAVORITES',
    shouldShowFavorites: bool
  }
}

export const fetchFavorites = (id) => {
  return (dispatch) => {
    fetch(`/api/users/${id}/favorites`)
     .then(response => response.json())
     .then(favObject => {
       favObject.map(favorite => {
         dispatch(toggleFavorites(favorite))
       })
     })
  }
}

export const addFavorite = (movie, id) => {
  return async (dispatch) => {
    const submitFavorite = await fetch('/api/users/favorites/new', {
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
    })
    const favoriteAdded = await submitFavorite.json()
    return dispatch(updateFavorites(id))
  };
};

export const removeFavorite = (movieId, userId) => {
  return async (dispatch) => {
    const deleteFavorite = await fetch(`/api/users/${userId}/favorites/${movieId}`, {
      method: 'DELETE',
      body: JSON.stringify({movie_id: movieId, user_id: userId}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const deleteSuccess = await deleteFavorite.json()
    return dispatch(updateFavorites(userId))
    console.log(deleteSuccess);
  }
}

export const updateFavorites = async (userId) => {
  console.log('in favorites');
  
    const updateFavorites = await fetch(`/api/users/${userId}/favorites`)
    const initialResponse = await updateFavorites.json()
    const favoritesData = await initialResponse.data
    return {
      type: 'UPDATE_FAVORITES',
      favoritesData

  }
}
