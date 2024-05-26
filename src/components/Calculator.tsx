import React, { FunctionComponent, useEffect, useState } from 'react';
import { Badge, Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import "./Calculator.css";
import "./Common.css";
import calculate from '../helpers/calculationHelper';

interface CalculatorProps {
  isPremiumAccount: boolean
}

interface calculationType {
  total: number,
  next: any,
  operation: any

}
 
const Calculator : any = (props: CalculatorProps) => {
  const [current, seCurrent] = useState(0);

  const [calculation , setCalculation] = useState<Partial<calculationType>>({
                                            total: 0,
                                            next: null,
                                            operation: null
                                          });


  function handleClick(event: any, digit: string) : void {
    setCalculation(calculate(calculation, digit));
  }

  const showTotal = () => {
    console.log(calculation);
    const { total, next } = calculation;
    if (total === 0 && next ===  null ) {
      return 0;
    } if (total !== 0 && total !== null) {
      return total;
    }
    if(!total && !next) {
      return 0;
    }

    return '';
  };

  return ( 
    
      

    <Container className="p-5 calculator-body-container">
      <div className="p-3 container-background-color calculator-body">
      <Row >
        <Col xs md="12" >
          <Badge bg="secondary">{!!props.isPremiumAccount ? "Advance" : "Basic"}</Badge>
          
        </Col>
      </Row>
        <Row className='calculator-row'>
          <Col xs md="12" className="calculator-total-detail">
            <span>{(showTotal()) + (calculation.operation || '') + (calculation.next || '')}</span>
          </Col>
        
          <Col xs md="12" className="calculator-total">
            <span>{!!calculation.next ? calculation.next : showTotal()}</span>
          </Col>
        
        </Row>
        {
          !!props.isPremiumAccount && <Row className='calculator-row'>
          <ButtonGroup aria-label="Basic example">
            <Button variant="none" onClick={(e) => handleClick(e,"MC")} >MC</Button>
            <Button variant="none" onClick={(e) => handleClick(e,"MR")} >MR</Button>
            <Button variant="none" onClick={(e) => handleClick(e,"M+")} >M+</Button>
            <Button variant="none" onClick={(e) => handleClick(e,"M-")} >M-</Button>
            <Button variant="none" onClick={(e) => handleClick(e,"MS")} >MS</Button>
            <Button variant="none" onClick={(e) => handleClick(e,"MD")} >MD</Button>
          </ButtonGroup>
        
        </Row>
        }
        <Row className='calculator-row'>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"%")} className="w-100">%</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"CE")} className="w-100">CE</Button>
          </Col>
          <Col xs md="3"  className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"C")} className="w-100">C</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"BACK")} className="w-100">⌫</Button>
          </Col>
        
        </Row>
        <Row className='calculator-row'>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"INVERSE")} className="w-100">1/x</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"SQUARE")} className="w-100">x<sup>2</sup></Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"ROOT")} className="w-100">&radic;<span>x</span></Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"÷")} className="w-100">÷</Button>
          </Col>
        
        </Row>
        <Row className='calculator-row'>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"7")} className="w-100">7</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"8")} className="w-100">8</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"9")} className="w-100">9</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"x")} className="w-100">X</Button>
          </Col>
        
        </Row>
        <Row className='calculator-row'>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"4")} className="w-100">4</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"5")} className="w-100">5</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"6")} className="w-100">6</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"-")} className="w-100">-</Button>
          </Col>
        
        </Row>
        <Row className='calculator-row'>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"1")} className="w-100">1</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"2")} className="w-100">2</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"3")} className="w-100">3</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"+")} className="w-100">+</Button>
          </Col>
        
        </Row>
        <Row className='calculator-row'>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"NEGATE")} className="w-100">+/-</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,"0")} className="w-100">0</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="secondary" onClick={(e) => handleClick(e,".")} className="w-100">.</Button>
          </Col>
          <Col xs md="3" className="text-center">
            <Button variant="primary" onClick={(e) => handleClick(e,"=")} className="w-100">=</Button>
          </Col>
        
        </Row>


      </div>
    </Container>
    
    
  );
}
 
export default Calculator;