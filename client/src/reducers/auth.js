import { LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, USER_LOADED, USER_LOADING, USER_LOAD_FAIL } from '../actions/types';
   
  const initialState = {
      token: localStorage.getItem('token'),
      user: null,
      isAuthenticated: false,
      loading: true,
      error: null
  }
   
  function authReducer(state = initialState, action) {
      const { type, payload } = action;
   
      switch (type) {
          case USER_LOADING:
            return {
              ...state,
              loading: true,
              error: null
            };
          case LOGIN_LOADING:
            return {
              ...state,
              loading: true,
              error: null
            };
          case USER_LOADED:
            return {
              ...state,
              isAuthenticated: true,
              loading: false,
              user: payload,
              error: null
            };
          case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
              ...state,
              isAuthenticated: true,
              token: payload.token,
              loading: false,
              user: payload.user,
              error: null
            };
          case USER_LOAD_FAIL:
          case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
              ...state,
              isAuthenticated: false,
              loading: false,
              user: null,
              error: null
            };
          case LOGOUT:
            localStorage.removeItem('token');
            return {
              ...state,
              token: null,
              isAuthenticated: false,
              loading: false,
              user: null,
              error: null
            };
          default:
            return state;
        }
  }
   
  export default authReducer;