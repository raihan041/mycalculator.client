import operate from './operationHelper';

function isNumber(item: any) {
  return !!item.match(/[0-9]+/);
}

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:s      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */
export default function calculate(obj: any, buttonName: any) {

  if(isNaN(obj.total)|| obj.total == 'Infinity') {
    obj.total = null;
  }
  if(isNaN(obj.next) || obj.next == 'Infinity') {
    obj.next = null;
  }


//memory section



if(buttonName === 'MC' || buttonName === 'MR' || buttonName === 'M+' || buttonName === 'M-' || buttonName === 'MS' || buttonName === 'MD')
{

  console.log('operation', obj);
  let count: any = localStorage.getItem('MyCalculatorMemoryLength');
  count = !count || Number(count) < 1 ? 1 : Number(count);
  let item: any = localStorage.getItem('MyCalculatorMemory_'+ (count));
  item = !!item ? Number(item) : 0;

  console.log('item', item);
 
  if(buttonName === 'M+') {
    localStorage.setItem('MyCalculatorMemory_' + (count), (item + (!!obj.next ? Number(obj.next) : item +  (!!obj.total ? Number(obj.total) : 0))).toString() );
    localStorage.setItem('MyCalculatorMemoryLength', (count).toString());
  }
  else if(buttonName === 'M-') {
    localStorage.setItem('MyCalculatorMemory_' + (count), (item - (!!obj.next ? Number(obj.next) :  item - (!!obj.total ? Number(obj.total) : 0))).toString() );
    localStorage.setItem('MyCalculatorMemoryLength', (count).toString());
  }
  else if(buttonName === 'MS') {
    localStorage.setItem('MyCalculatorMemory_' + (count + 1), ( (!!obj.next? Number(obj.next) :  (!!obj.total ? Number(obj.total) : 0))).toString() );
    localStorage.setItem('MyCalculatorMemoryLength', (count + 1).toString());
  }
  else if(buttonName === 'MD') {
    localStorage.removeItem('MyCalculatorMemory_' + (count));
    localStorage.setItem('MyCalculatorMemoryLength', (count > 0 ? count - 1 : 1 ).toString());
  }
  else if(buttonName === 'MC') { 
    for(let i = 1; i <= count; i++) {
      localStorage.removeItem('MyCalculatorMemory_' + i);

    }
    localStorage.removeItem('MyCalculatorMemoryLength');
  }
  else if(buttonName === 'MR') {
    return {
      total: null,
      next: item.toString(),
      operation: null,
    };
  }
  
  return {
    ...obj,
    operation : null
  };

  
}



//end memory section

  if (buttonName === 'C') {
    return {
      total: '0',
      next: null,
      operation: null,
    };
  }

  if (buttonName === 'CE') {

    if (!obj.next && !obj.operation) {
      return {
        total: '0',
        next: null,
        operation: null,
      };
    }

    return {
      ...obj,
      next: null
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === '0' && obj.next === '0') {
      return {};
    }
    // If there is an operation, update next
    if (obj.operation) {
      if (obj.next && obj.next !== '0') {
        return { ...obj, next: obj.next + buttonName };
      }
      return { ...obj, next: buttonName };
    }
    // If there is no operation, update next and clear the value
    if (obj.next && obj.next !== '0') {
      return {
        next: obj.next + buttonName,
        total: null,
      };
    }
    return {
      next: buttonName,
      total: null,
    };
  }

  if (buttonName === '.') {
    if (obj.next) {
      if (obj.next.includes('.')) {
        return { ...obj };
      }
      return { ...obj, next: `${obj.next}.` };
    }
    if (obj.operation) {
      return { ...obj, next: '0.' };
    }
    if (obj.total) {
      if (obj.total.includes('.')) {
        return {};
      }
      return { ...obj, next: `${obj.total}.` };
    }
    return { ...obj, next: '0.' };
  }

  if (buttonName === '=') {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
      };
      
    }

    
    // '=' with no operation, nothing to do
    return {
      total: !!obj.total ? obj.total : 0,
      next: !!obj.next ? obj.next : null,
      operation: null,
    };
  }

  if (buttonName === 'BACK') {
    if (obj.next && obj.operation) {
      return {
        ...obj,
        next: obj.next.substring(0, obj.next.length-1),
      };
    }
    else if (obj.next) {
      return {
        ...obj,
        next: obj.next.substring(0, obj.next.length-1),
      };
    }
    

    return {
      total: 0,
      next: null,
      operation: null,
    };
    // '=' with no operation, nothing to do
 
  }

  if (buttonName === 'NEGATE') {
    if (obj.next) {
      return { ...obj, next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { ...obj, total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {
      total: 0,
      next: null,
      operation: null,
    };
  }

  if (buttonName === 'INVERSE') {
    if (obj.next) {
      return { ...obj, next: (1 / parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { ...obj, total: (1 / parseFloat(obj.total)).toString() };
    }
    return {
      total: 0,
      next: null,
      operation: null,
    };
  }

  if (buttonName === 'SQUARE') {
    if (obj.next) {
      return { ...obj, next: (parseFloat(obj.next) * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { ...obj, total: (parseFloat(obj.total) * parseFloat(obj.total)).toString() };
    }
    return {
      total: 0,
      next: null,
      operation: null,
    };
  }

  if (buttonName === 'ROOT') {
    if (obj.next) {
      return { ...obj, next: (Math.sqrt( parseFloat(obj.next))).toString() };
    }
    if (obj.total) {
      return { ...obj, total: (Math.sqrt( parseFloat(obj.total))).toString() };
    }
    return {
      total: 0,
      next: null,
      operation: null,
    };
  }

  if (buttonName === '%') {
    if (obj.next) {
      return { ...obj, next: ( parseFloat(obj.next) / 100).toString() };
    }
    if (obj.total) {
      return { ...obj, total: ( parseFloat(obj.total) / 100).toString() };
    }
    return {
      total: 0,
      next: null,
      operation: null,
    };
  }

  // Button must be an operation

  // When the user presses an operation button without having entered
  // a number first, do nothing.
  // if (!obj.next && !obj.total) {
  //   return {};
  // }

  // User pressed an operation after pressing '='
  if (!obj.next && obj.total && !obj.operation) {
    return { ...obj, operation: buttonName };
  }

  // User pressed an operation button and there is an existing operation
  if (obj.operation) {
    if (obj.total && !obj.next) {
      return { ...obj, operation: buttonName };
    }

    if (!obj.total) {
      return { total: 0, operation: buttonName };
    }

    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
    };
  }

  // no operation yet, but the user typed one

  // The user hasn't typed a number yet, just save the operation
  if (!obj.next) {
    return {
      total: '0',
      next: null,
      operation: buttonName,
    };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: obj.next,
    next: null,
    operation: buttonName,
  };
}