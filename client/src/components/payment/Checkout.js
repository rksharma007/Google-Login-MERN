import propTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { checkout } from '../../actions/payment';
import api from '../../utils/api';


const Checkout = ({auth: {user}, checkout}) => {

    const handleCheckout = () => {
        api.post('/payment/checkout', {
            userId: user._id,
          })
          .then((response) => {
            if (response.data.url) {
              window.location.href = response.data.url;
            }
          })
          .catch((err) => console.log(err.message));
      };

  return (
    <>
        {user && user.usertype==='free' &&
            <Button variant='danger' onClick={ handleCheckout}>Subscribe</Button>
        }
        {user && user.usertype==='pro' &&
            <Button variant='success'>Subscribed</Button>
        }
    </>
  )
}


Checkout.propTypes = {
    auth : propTypes.object.isRequired,
    payment : propTypes.object.isRequired,
    checkout : propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    payment : state.payment
});

export default connect(mapStateToProps, {checkout})(Checkout);
  