import React from 'react';
import { Button } from 'react-bootstrap';

const GoogleLogin = () => {
    const loginWithGoogle = async (ev) => {
        ev.preventDefault();
        window.open("http://localhost:5000/api/auth/google", "_self");
        // const res = await api.get('/auth/google', config);
    }
    return (
        <Button variant='danger' onClick={loginWithGoogle}><i className='fa-brands fa-google'/>&nbsp;&nbsp;Login</Button>
    )
};

export default GoogleLogin;
