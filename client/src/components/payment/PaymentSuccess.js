import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <Container className='d-flex justify-content-center'>
      <Card border='success' style={{width: '50%', marginTop: '100px', alignItems:'center'}}>
        <Card.Body>
          Payment Successful
          <br/><br/>
          <Link to='/dashboard'>
            <Button variant='success'>
              Go to Dashboard
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default PaymentSuccess;
