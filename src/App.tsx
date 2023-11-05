import { useState } from 'react'
import './App.css'

const numbers = {
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  '0': 'zero',
  '.': 'decimal'
}
const operators = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide'
}

function App() {
  const [input, setInput] = useState<string>('0')
  const [formula, setFormula] = useState<string[] | null>(null)
  const [result, setResult] = useState<number | null>(null)

  const addToFormula = (value: string) => {
    setFormula((prev) => (prev ? [...prev, value] : [value]))
  }

  const updateFormula = (value: string) => {
    setFormula((prev) => (prev ? [...prev.slice(0, -1), value] : [value]))    
  }

  const handleNumber = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.innerText

    if (result) {
      setInput(value)
      setFormula([value])
      setResult(null)
      return
    }

    if (!input) {
      setInput(value)
      addToFormula(value)
      return
    }

    if (input === '0' && value === '0') return
    if (input.includes('.') && value === '.') return
    
    if (Object.keys(numbers).includes(input[0])) {
      if (input === '0') {
        setInput(value)
        updateFormula(value)
      } else {
        setInput(input + value)
        updateFormula(input + value)  
      }
    } else {
      setInput(value)
      addToFormula(value)
    }
  }

  const handleOperator = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.innerText

    if (result) {
      setInput(value)
      setFormula([result.toString(), value])
      setResult(null)
      return
    }

    if (!input) {
      if (value === '-') {
        setInput(value)
        addToFormula(value)
      }
      return
    }

    if (Object.keys(operators).includes(input[0])) {
      if (value !== '-') {
        setInput(value)
        updateFormula(value)
      } else {
        setInput(input + value)
        updateFormula(input + value)
      }
    } else {
      setInput(value)
      addToFormula(value)
    }
  }

  const handleCalculate = () => {
    if (result) return
    const answer = formula ? eval(formula.join('')) : 0
    setResult(answer.toString())
    setInput(answer.toString())
    setFormula((prev) => (prev ? [...prev, '=', answer.toString()] : ['=', answer.toString()]))
  }

  const handleClear = () => {
    setInput('0')
    setFormula(null)
    setResult(null)
  }

  return (
    <div>
      <div id='calculator'>
        <div id='output'>
          <div id='formula'>{formula}</div>
          <div id='display'>{input}</div>
        </div>
        <div id='numbers'>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].map((number) => (
            <button id={numbers[number as keyof typeof numbers]} key={number} onClick={handleNumber}>
              {number}
            </button>
          ))}
          
        </div>
        <div id='operators'>
          {['+', '-', '*', '/'].map((operator) => (
            <button id={operators[operator as keyof typeof operators]} key={operator} onClick={handleOperator}>
              {operator}
            </button>
          ))}
        </div>
        <button id='equals' onClick={handleCalculate}>=</button>
        <button id='clear' onClick={handleClear}>CLEAR</button>
      </div>
    </div>
  )
}

export default App
