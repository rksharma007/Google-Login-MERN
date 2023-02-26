import propTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import Logout from '../auth/Logout';


const Dashboard = ({auth:{user, loading }}) => {

  return (
    <Container>
      Dashboard
      <hr/>
      <br/>
      {user && <img src={user && user.imageUrl && user.imageUrl} alt = 'profile img'/>}
      <table> 
        <tbody>
        <tr><td>Name</td><td>{user && user.name}</td></tr>
        <tr><td>Email</td><td>{user && user.email}</td></tr>
        <tr><td>Date Joined</td><td>{user && user.date}</td></tr>
        <tr><td>GoogleId</td><td>{user && user.userId}</td></tr>
        </tbody>
      </table>
      <hr/>
      <Logout/>
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
