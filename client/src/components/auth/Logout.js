import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Logout = ({logout, history}) => {

    const handleLogout = (e) =>{
        e.preventDefault();
        // window.open("http://localhost:5000/api/auth/logout", "_self");
        logout(history);
    }

    return (
        <Button variant='danger' onClick={handleLogout}><i className='fa-brands fa-google'/>&nbsp;&nbsp;Logout</Button>
    )
}

export default connect(null, {logout})(Logout);