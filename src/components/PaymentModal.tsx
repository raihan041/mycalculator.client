import { CardElement, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';

import { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SignUp from './SignUp';
import SignIn from './SignIn';

function PaymentModal(props: any) {

  return (
    <>
     
      <Modal 
        show={props.isPaymentModalOpen} 
        onHide={() => props.setIsPaymentModalOpen(false)}      
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
            <Tabs
            defaultActiveKey="signUp"
            id="fill-tab-example"
            className="mb-3"
            fill
            >
              
                <Tab eventKey="signUp" title="signUp">
                    <SignUp signInConfirmation={props.signInConfirmation} setIsPaymentModalOpen={props.setIsPaymentModalOpen}/>
                </Tab>
                <Tab eventKey="signIn" title="signIn">
                    <SignIn signInConfirmation={props.signInConfirmation} setIsPaymentModalOpen={props.setIsPaymentModalOpen}/>
                </Tab>
            </Tabs>
        </Modal.Body>
      </Modal>
      </>
  );
}

export default PaymentModal;