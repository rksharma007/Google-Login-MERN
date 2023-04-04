import propTypes from 'prop-types';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import Logout from '../auth/Logout';
import Checkout from '../payment/Checkout';


const Dashboard = ({auth:{user, loading }}) => {

  return (
    <Container>
      Dashboard
      <hr/>
      <br/>
      <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card style={{maxWidth: '500px'}}>
          <Card.Header style={{display:'flex', justifyContent: 'center'}}>
          {user && <img src={user && user.imageUrl && user.imageUrl} alt = 'profile image' style={{borderRadius:'100%'}}/>}
          </Card.Header>
          <Card.Body style={{alignItems: 'center'}}>
            <table> 
              <tbody>
              <tr><td>Name</td><td>&nbsp;&nbsp;</td><td>{user && user.name}</td></tr>
              <tr><td>Email</td><td>&nbsp;&nbsp;</td><td>{user && user.email}</td></tr>
              <tr><td>Date Joined</td><td>&nbsp;&nbsp;</td><td>{user && user.date}</td></tr>
              <tr><td>GoogleId</td><td>&nbsp;&nbsp;</td><td>{user && user.userId}</td></tr>
              </tbody>
            </table>
          </Card.Body>
          <Card.Footer className='text-center'>
            <Logout/> &nbsp;&nbsp; <Checkout/>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  )
}

Dashboard.propTypes = {
  auth : propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth : state.auth
})

export default connect(mapStateToProps, {})(Dashboard);
