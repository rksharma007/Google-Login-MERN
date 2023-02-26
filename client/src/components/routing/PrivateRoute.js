import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PreLoader from '../layout/PreLoader';

const PrivateRoute = ({component: Component, auth}) => {

    if(auth.isAuthenticated) return <Component/>;
    if(auth.loading) return <PreLoader/>
    return <Navigate to='/'/>;
}

PrivateRoute.propTypes = {
    auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);