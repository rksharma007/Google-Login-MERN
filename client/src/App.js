// import Cookies from 'js-cookie';
import propTypes from 'prop-types';
import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadUser, loginWithGoogleOauth } from "./actions/auth";
import { LOGOUT } from './actions/types';
import './CSS/App.css';
import store from './store';
import setAuthToken from './utils/setAuthToken';

//Layouts
import TokenSetter from './components/auth/TokenSetter';
import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound';
import PreLoader from './components/layout/PreLoader';

// Private Route
import PrivateRoute from './components/routing/PrivateRoute';

// Lazy Loading pages
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const Landing = lazy(() => import('./components/layout/Landing'));
const PaymentSuccess = lazy(() => import('./components/payment/PaymentSuccess'));
const PaymentCancelled = lazy(() => import('./components/payment/PaymentCancelled'));

const App = ({loginWithGoogleOauth, loadUser, auth}) => {

  useEffect(() => {
    if(localStorage.token){
      setAuthToken(localStorage.token);
      loginWithGoogleOauth(localStorage.token);
      // navigate('/dashboard');
    }
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  // useEffect(() => {
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //     // loadUser();
  //   }
  //   window.addEventListener('storage', () => {
  //     if (!localStorage.token) store.dispatch({ type: LOGOUT });
  //   });
  // }, []);

  // useEffect(() => {
  //   const cookieJwt = Cookies.get('x-auth-cookie');
  //   if (cookieJwt) {
  //     Cookies.remove('x-auth-cookie');
  //     setAuthToken(cookieJwt);
  //     loginWithGoogleOauth(cookieJwt);     
  //   }
  // }, []);

  useEffect(() => {
    if ( !auth.loading && auth.token && !auth.isAuthenticated) {
      loadUser();
    }
  }, [auth.isAuthenticated, auth.token, loadUser, auth.loading]);
  
  return (
    <Router>
      <Suspense fallback={<PreLoader />}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login/*' element={<TokenSetter/>} />
          <Route path='/dashboard' element={
            <PrivateRoute component ={Dashboard} />
          }/>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/paymentcancelled" element={<PaymentCancelled />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Alert/>
    </Router>
  );
}

App.propTypes = { 
  loadUser: propTypes.func.isRequired,
  loginWithGoogleOauth: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {loadUser, loginWithGoogleOauth})(App);