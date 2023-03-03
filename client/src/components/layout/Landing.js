import propTypes from 'prop-types';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import GoogleLogin from '../auth/GoogleLogin';


const Landing = ({ auth: { user, isAuthenticated, loading}, logout }) => {

    return (
    <Container>
        
        { !isAuthenticated  &&
            <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Card style={{alignItems: 'center', marginTop: "100px", minWidth: '400px', height:'300px'}}>
                    <Card.Body>You are not logged in</Card.Body>
                    <Card.Footer>

                        <GoogleLogin/>
                        
                    </Card.Footer>
                    
                </Card>
            </div>
        }

        { isAuthenticated && user &&
            <span style={{fontSize:'30pt'}}>
            <br/>
            <Link to='/dashboard'>
                <button className='btn btn-primary'>Dashboard</button>
            </Link>
            </span>
        }
    </Container>
)
}

Landing.propTypes = {
    logout: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Landing);