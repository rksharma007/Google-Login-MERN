import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginWithGoogleOauth } from '../../actions/auth';
import setAuthToken from '../../utils/setAuthToken';
import PreLoader from '../layout/PreLoader';

const TokenSetter = ({auth, loginWithGoogleOauth, setAuthToken}) => {
    const navigate = useNavigate();
    useEffect(() => {
        var url = window.location+'';
        const token = url.split("/").pop();
        console.log(token);
        //setAuthToken(token);
        loginWithGoogleOauth(token, navigate);
    }, []);


    return (
        <>
            {/* <h1 className='text-center'>Token Setter</h1> */}
            <PreLoader/>
        </>
    );
};

TokenSetter.propTypes = {
    loginWithGoogleOauth: propTypes.func.isRequired,
    setAuthToken: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {loginWithGoogleOauth, setAuthToken})(TokenSetter);
