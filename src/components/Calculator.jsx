import { useState } from 'react'

export default function Calculator() {
// Calculator state
  const [currentValue, setCurrentValue] = useState('0')
  const [storedValue, setStoredValue] = useState(null)
  const [currentOperator, setCurrentOperator] = useState(null)
  const [needsClear, setNeedsClear] = useState(false)

// Handle number button clicks
  const handleNumberClick = (number) => {
    if (needsClear) {
      setCurrentValue(number)
      setNeedsClear(false)
    } else {
      setCurrentValue(currentValue === '0' ? number : currentValue + number)
    }
  }

  // Handle decimal point click
  const handleDecimalClick = () => {
    if (needsClear) {
      setCurrentValue('0.')
      setNeedsClear(false)
      return
    }

    if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.')
    }
  }

  // Clear calculator state
  const handleClearClick = () => {
    setCurrentValue('0')
    setStoredValue(null)
    setCurrentOperator(null)
    setNeedsClear(false)
  }

  // Handle operation button clicks
  const handleOperationClick = (operator) => {
    const value = parseFloat(currentValue)

    // If no stored value yet, store current value and operator
    if (storedValue === null) {
      setStoredValue(value)
    }
    // Otherwise calculate result based on previous operator
    else if (currentOperator) {
      const result = calculateResult(storedValue, value, currentOperator)
      setCurrentValue(String(result))
      setStoredValue(result)
    }

    // Prepare for next number input
    setNeedsClear(true)
    setCurrentOperator(operator)
  }

  // Calculate result based on operation
  const calculateResult = (first, second, operator) => {
    switch (operator) {
      case '+': return first + second
      case '-': return first - second
      case '*': return first * second
      case '/': return first / second
      default: return second
    }
  }

  return (
    <div className="calculator-container">
      <div className="calculator">
        {/* Display current value */}
        <div className="display">{currentValue}</div>

        {/* Calculator buttons */}
        <div className="buttons">
          {/* Numbers and operations arranged in rows */}
          <div className="row">
            <button onClick={() => handleNumberClick('7')}>7</button>
            <button onClick={() => handleNumberClick('8')}>8</button>
            <button onClick={() => handleNumberClick('9')}>9</button>
            <button className="operator" onClick={() => handleOperationClick('/')}>/</button>
          </div>
          <div className="row">
            <button onClick={() => handleNumberClick('4')}>4</button>
            <button onClick={() => handleNumberClick('5')}>5</button>
            <button onClick={() => handleNumberClick('6')}>6</button>
            <button className="operator" onClick={() => handleOperationClick('*')}>*</button>
          </div>
          <div className="row">
            <button onClick={() => handleNumberClick('1')}>1</button>
            <button onClick={() => handleNumberClick('2')}>2</button>
            <button onClick={() => handleNumberClick('3')}>3</button>
            <button className="operator" onClick={() => handleOperationClick('-')}>-</button>
          </div>
          <div className="row">
            <button onClick={() => handleNumberClick('0')}>0</button>
            <button onClick={handleDecimalClick}>.</button>
            <button onClick={() => handleOperationClick('=')}>=</button>
            <button className="operator" onClick={() => handleOperationClick('+')}>+</button>
          </div>
          <div className="row">
            <button className="clear" onClick={handleClearClick}>C</button>
          </div>
        </div>
      </div>
    </div>
  )
}
