import { PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Common.css";
import { Alert, Spinner } from 'react-bootstrap';
import { postData } from '../services/apiService';

function SignUp(props: any) {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const stripe: any = useStripe();
  const elements: any = useElements();


    const handleSignUp = async (event: any) => {
        
      event.preventDefault();

      setValidated(true);
      const form = event.currentTarget;
      if (!form.checkValidity()) {
        event.stopPropagation();
        
        return;
      }

      if (!stripe) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      setLoading(true);
  
      // Trigger form validation and wallet collection
      const {error: submitError} = await elements.submit();
      if (submitError) {
        //handleError(submitError);
        setErrorMessage(submitError);
        console.log('submit error', submitError);
        setLoading(false);
        return;
      }
  
    // Create the ConfirmationToken using the details collected by the Payment Element
    // and additional shipping information
    const {error, confirmationToken} = await stripe.createConfirmationToken({
      elements
    });
  
      if (error) {
        // This point is only reached if there's an immediate error when
        // creating the ConfirmationToken. Show the error to your customer (for example, payment details incomplete)
        setErrorMessage(error);
        console.log('ct error', error);
        setLoading(false);
        return;
      }

      
      const payload = {
          confirmationTokenId: confirmationToken.id,
          paymentMode: 'payment',
          paymentType: confirmationToken.payment_method_preview.type,
          email: email,
          name: name,
          cardNumberLastFourDigit: confirmationToken.payment_method_preview.card.last4,
          cardValidity: confirmationToken.payment_method_preview.card.exp_month + '/' + confirmationToken.payment_method_preview.card.exp_year
      };
      postData('/payment/createConfirmIntent', payload, (res: any) => {
        if(!!res.isSignInSuccessful) {
          
          props.signInConfirmation(res);
        }
        else {
          setErrorMessage(res.message);
        }
        
        setLoading(false);
        
      }, (errorMessage: any) => {
        setErrorMessage(errorMessage);
        console.log('Error message: ', errorMessage); 
        
        setLoading(false);
      });
    
    }

  return (
    <>
    {
      !!errorMessage && <Alert key="danger" variant="danger">
        {errorMessage}
      </Alert>
      }
      {!!loading && <div className='loader-div'></div>}
   
      <Form noValidate validated={validated}  onSubmit={handleSignUp}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput12">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            
            <PaymentElement />
            
            <div className='signin-submit-button-div'>
              
              <Button variant="primary" type="submit"  disabled={!stripe || loading}>
                Submit
              </Button>
              <Button style={{marginLeft:"10px"}} variant="secondary" onClick={() => props.setIsPaymentModalOpen(false)}>
                Close
              </Button>
            </div>
          </Form> 
     
    </>
  );
}

export default SignUp;