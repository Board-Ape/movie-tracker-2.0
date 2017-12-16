import { combineReducers } from 'redux';
import MoviesReducer from './MoviesReducer';
import SignIn from './SignIn';
import favorites from './favorites';
import user from './user';
import shouldShowFavorites from './shouldShowFavorites';


export default combineReducers({
  MoviesReducer,
  SignIn,
  favorites,
  user,
  shouldShowFavorites
});
