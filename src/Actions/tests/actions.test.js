/* eslint-disable max-len */
/* eslint-disable id-blacklist */

import * as actions from '../index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('all actions', () => {
  describe('signin related actions', () => {
    it('has a type of SIGNIN_SUCCESS', async () => {
      const mockUserObject = {
        data: {
          email: "123",
          id: 2,
          name: "123",
          password: "123"
        },
        message: "Retrieved ONE User",
        status: "success"
      };

      const expectedRes = {
        type: 'SIGNIN_SUCCESS',
        userObject: mockUserObject
      };

      expect(await actions.signInSuccess(mockUserObject)).toEqual(expectedRes);
    });

    it('has a type of SIGNIN_FAILURE', () => {
      const mockError = 'user not found';

      const expectedRes = {
        type: 'SIGNIN_FAILURE',
        errorMessage: mockError
      };

      expect(actions.signInFailure(mockError)).toEqual(expectedRes);
    });

    it('has a type of SIGN_OUT', () => {
      const expectedRes = {
        type: 'SIGN_OUT'
      };

      expect(actions.signOut()).toEqual(expectedRes);
    });

    it.skip('posts to /api/users/new when a signUpAttempt is made', async () => {
      window.fetch = jest.fn().mockImplementation( () => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(
          {
            "status": "success",
            "message": "New user created",
            "id": 4
          }
        )
      }));


      const mockUserObject = {
        data: {
          email: "123",
          id: 2,
          name: "123",
          password: "123"
        },
        message: "Retrieved ONE User",
        status: "success"
      };

      const store = mockStore({ favorites: [], SignIn: {error: null, signedIn: false, userData: mockUserObject} });

      store.dispatch(actions.signUpAttempt('email', 'pass'))
        .then(()=> {
          expect(window.fetch).toHaveBeenCalled();
        });


    });

    it.skip('calls in signInSuccess & updateFavorites on succesful signin', () => {
      const mockUserObject = {
        data: {
          email: "123",
          id: 2,
          name: "123",
          password: "123"
        },
        message: "Retrieved ONE User",
        status: "success"
      };
      const store = mockStore({ favorites: [], SignIn: {error: null, signedIn: false, userData: mockUserObject} });

      const expectedActions = [
        {type: 'SIGNIN_SUCCESS', mockUserObject},
        {type: 'UPDATE_FAVORITES', id: 2}
      ];

      store.dispatch(actions.signInAndFavorites(mockUserObject))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('has a type of SIGNUP_FAILURE', () => {
      const expectedRes = {
        type: "SIGN_UP_FAILURE",
        error: 'no bueno'
      };

      expect(actions.signUpFailure('no bueno')).toEqual(expectedRes);
    });

    it('has a type of SIGN_UP_SUCCESS', async () => {
      const mockUser = {
        email: "123",
        id: 4,
        name: "123",
        password: "123"
      };
      const expectedRes = {
        type: 'SIGN_UP_SUCCESS',
        newUser: mockUser
      };
      window.fetch = jest.fn().mockImplementation( () => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(
          {
            "status": "success",
            "message": "fetched all users",
            "data": [mockUser]
          }
        )
      }));
      const signUpSuccessRes = await actions.signUpSuccess(4);
      expect(signUpSuccessRes).toEqual(expectedRes);
    });
  });

  describe('Movie actions', () => {

    it('has a type of MOVIES_IS_LOADING', () => {
      const isLoading = true;
      const expected = {
        type: 'MOVIES_IS_LOADING'
      };
      expect(actions.moviesIsLoading(isLoading)).toEqual(expected);
    });

    it('has a type of MOVIES_HAS_ERRORED', () => {
      const hasErrored = true;
      const expected = {
        type: 'MOVIES_HAS_ERRORED'
      };
      expect(actions.moviesHasErrored(hasErrored)).toEqual(expected);
    });


    it('has a type of MOVIES_FETCH_DATA_SUCCESS', () => {
      const movies = [{ stuff: 'stuff' }];
      const expected = {
        type: 'MOVIES_FETCH_DATA_SUCCESS',
        movies
      };
      expect(actions.moviesFetchDataSuccess(movies)).toEqual(expected);
    });
  });

  describe('Favorites actions', () => {
    it('should return object with type EMPTY_FAVORITES', () => {
      const expected = {
        type: 'EMPTY_FAVORITES'
      };

      expect(actions.emptyFavorites()).toEqual(expected)
    });

    it('should have a type of UPDATE_FAVORITES', async () => {
      const mockFavs = [
        {title: 'Star Wars'}
      ];
      const expectedRes = {
        type: 'UPDATE_FAVORITES',
        favoritesData: mockFavs
      };
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(
          {
            "status": "success",
            "message": "favorites incoming",
            "data": mockFavs
          }
        )
      }));
      const updateFavoritesRes = await actions.updateFavorites(4);
      expect(updateFavoritesRes).toEqual(expectedRes);
    });
  });

  // it('has a type of SIGN_UP_SUCCESS', async () => {
  //   const mockUser = {
  //     email: "123",
  //     id: 4,
  //     name: "123",
  //     password: "123"
  //   };
  //   const expectedRes = {
  //     type: 'SIGN_UP_SUCCESS',
  //     newUser: mockUser
  //   };
  //   window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  //     status: 200,
  //     json: () => Promise.resolve(
  //       {
  //         "status": "success",
  //         "message": "fetched all users",
  //         "data": [mockUser]
  //       }
  //     )
  //   }));
  //   const signUpSuccessRes = await actions.signUpSuccess(4);
  //   expect(signUpSuccessRes).toEqual(expectedRes);
  // });

  // describe('favorite actions', () => {
  //   it('setFavorites returns an obj  with type of SET_FAVORITES', () => {
  //     const favorites = [{ title: 'Casper' }, { title: 'Thor' }, { title: 'Batman' }];
  //     const expected = {
  //       type: 'SET_FAVORITES',
  //       favorites
  //     };
  //   });

  //   it('clearFavorites returns an obj with type of CLEAR_FAVORITES', () => {
  //     const favorites = [{ title: 'Casper' }, { title: 'Thor' }, { title: 'Batman' }];
  //     const expected = {
  //       type: 'CLEAR_FAVORITES',
  //       favorites
  //     };
  //   });
});
