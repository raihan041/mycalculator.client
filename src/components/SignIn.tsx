import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postData } from '../services/apiService';

function SignIn(props: any) {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");


    function handleSignIn(event: any): void {
      
      event.preventDefault();
      setErrorMessage("");
      
      setValidated(true);
      const form = event.currentTarget;
      if (!form.checkValidity()) {
        event.stopPropagation();
        
        return;
      }

      const payload = {
        email, password
      };
      postData('/auth/signIn', payload, (res: any) => {
        if(!!res.isSignInSuccessful) {
          
          props.signInConfirmation(res);
        }
        else {
          setErrorMessage(res.message);
        }
      }, (errorMessage: any) => {
        setErrorMessage(errorMessage);
        console.log('Error message: ', errorMessage); 
      });
    }

  return (
    <>
     {
      !!errorMessage && <Alert key="danger" variant="danger">
        {errorMessage}
      </Alert>
      }
     <Form noValidate validated={validated}  onSubmit={handleSignIn}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
            </Form.Control.Feedback>
            </Form.Group>
            <div className='signin-submit-button-div'>
              <Button variant="primary" type="submit">
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

export default SignIn;