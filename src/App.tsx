import React, { useState } from 'react';
import Calculator from './components/Calculator';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentModal from './components/PaymentModal';
import "./components/Common.css";

function App() {
  
  const [isPremiumAccount, setIsPremiumAccount] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const stripePromise = loadStripe("pk_test_51PJwXrHv018QXa2S3FXB5aDiNELomLf2T3KUZ0GB6hZ9bzfYQtXXDwZdP3HIb7DiZPuZb0a7q6QNQI2PBVRR97Sb00IGwtymWM") ;
  const options: StripeElementsOptions  = {
    mode: 'payment',
    amount: 1000,
    currency: 'usd',
    paymentMethodCreation: 'manual',
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };

  const signInConfirmation = (data: any) => {
    

    if(!!data.isSignInSuccessful) {
      setIsPaymentModalOpen(false);
    }
    else {
      console.log(data);
    }

    if(!!data.isPremiumUser) {
      setIsPremiumAccount(true);
    }
  }



  return (
    <Container className="p-3">
        {!!isPaymentModalOpen && 
        <Elements stripe={stripePromise} options={options}>          
          <PaymentModal isPaymentModalOpen={isPaymentModalOpen} setIsPaymentModalOpen={setIsPaymentModalOpen} signInConfirmation={signInConfirmation}/>
        </Elements>
        }
        <Container className="p-3 mb-4 container-background-color rounded-3">
        
          <Row>
            <Col className="text-center">
              <span style={{fontWeight:"700", fontSize:"40px"}}>
                WEB CALCULATOR
              </span>
              {
                 !isPremiumAccount &&   
                 (
 
                   <Button variant="link" onClick={() => setIsPaymentModalOpen(true)} style={{float: "right"}}>
                     Go Premium
                   </Button>
                 )
              }
            </Col>
            
          </Row>
      </Container>
      <Calculator isPremiumAccount={isPremiumAccount} />
    </Container>
  );
}

export default App;
