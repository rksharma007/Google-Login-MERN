import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, USER_LOADED, USER_LOADING, USER_LOAD_FAIL } from './types';

// Load User
export const loadUser = () => async (dispatch, getState) => {

    
    try {
        dispatch({
            type: USER_LOADING
        })
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
        
        const res = await api.get(`/user/me`);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: USER_LOAD_FAIL
        });
    }
};
 
//Login User
export const loginWithGoogleOauth = (token) => async (dispatch) => {

    try {
        dispatch({
            type: LOGIN_LOADING
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Methods": "POST,  PUT, GET",
                'x-auth-token': token
            }
        }
        const res = await api.get(`/user/me`, config);
 
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {user : res.data, token}
            //payload: token
        });
 
        //localStorage.setItem('token', token);
        await dispatch(loadUser());
 
        dispatch(setAlert('Logged in! Welcome.', 'success'));
 
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL,
            payload: { error: err.response.data.message }
        });
    }
}

// LOGOUT
export const logout = (history) => async (dispatch) => {
    try {
      deleteAllCookies();
      await api.get('/auth/logout');
  
      dispatch({
        type: LOGOUT
      });
      dispatch(setAlert('B-Bye! See you soon.', 'success'));
      if (history) history.push('/');
    } catch (err) {}
};

function deleteAllCookies() {
    var cookies = document.cookie.split(';');
  
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
  
  export const attachTokenToHeaders = (getState) => {
    const token = getState().auth.token;
  
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
  
    if (token) {
      config.headers['x-auth-token'] = token;
    }
  
    return config;
  };