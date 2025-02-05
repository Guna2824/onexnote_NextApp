'use client';

import { useState, useEffect } from 'react';

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const evalResult = eval(expression); // Avoid eval in production; consider using a library like math.js
        setResult(evalResult.toString());
        const newHistoryItem = `${expression} = ${evalResult}`;
        setHistory((prevHistory) => [...prevHistory, newHistoryItem]);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('');
    } else {
      setExpression(expression + value);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculatorHistory');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        
        {/* Calculator Section */}
        <div className="flex-2 p-6 bg-violet-400 text-white w-full sm:w-3/5">
          <input
            className="w-full text-right bg-gray-800 text-xl p-3 rounded-lg mb-4"
            placeholder="Expression"
            value={expression}
            readOnly
          />
          <input
            className="w-full text-right bg-gray-800 text-xl font-semibold p-3 rounded-lg mb-6"
            placeholder="Result"
            value={result}
            readOnly
          />
          <div className="grid grid-cols-4 gap-4">
            {['sin', 'cos', 'tan', '^', '√', 'log', '(', ')'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-all"
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+', '=', 'C'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className={`${
                  btn === 'C' ? 'col-span-4' : ''
                } bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-all`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="hidden sm:block sm:w-2/5 p-6 bg-gray-50">
          <div className="bg-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">History</h3>
            <div className='overflow-y-auto h-96 '>
            <ul className="space-y-4">
              {history.map((item, index) => (
                <li key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={clearHistory}
              className="mt-4 bg-red-500 hover:bg-red-400 text-white p-2 rounded-lg w-full"
            >
              Clear History
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
