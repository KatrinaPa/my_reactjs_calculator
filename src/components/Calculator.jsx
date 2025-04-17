import React, { useState } from 'react';
import './Calculator.css';
import Display from './Display.jsx';
import Button from './Button.jsx';

export default function Calculator() {
    const [input, setInput] = useState('');

    const buttons = [
        "1", "2", "3", "+",
        "4", "5", "6", "-",
        "7", "8", "9", "*",
        "C", "0", "=", "/"
    ];

    const calculate = (expression) => {
        // Handle negative number at the start
        if (expression.startsWith('-')) {
            expression = '0' + expression;
        }
        
        // Split into numbers and operators
        const tokens = expression.split(/([+\-*/])/g).filter(token => token.trim() !== '');
        if (!tokens) return '0';

        // First pass: handle multiplication and division
        let i = 0;
        while (i < tokens.length) {
            if (tokens[i] === '*' || tokens[i] === '/') {
                const prev = parseFloat(tokens[i - 1]);
                const next = parseFloat(tokens[i + 1]);
                let result;

                if (tokens[i] === '*') {
                    result = prev * next;
                } else {
                    if (next === 0) return 'Error';
                    result = prev / next;
                }

                // Replace these three tokens with the result
                tokens.splice(i - 1, 3, result.toString()); // Start at index i-1, replace 3 tokens with the result
                i--;
            }
            i++;
        }

        // Second pass: handle addition and subtraction
        let result = parseFloat(tokens[0]);
        for (i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const nextNum = parseFloat(tokens[i + 1]);

            if (operator === '+') result += nextNum;
            if (operator === '-') result -= nextNum;
        }

        return result.toString();
    };

    const handleClick = (button) => {
        if (button === "C") {
            setInput('');
        } else if (button === "=") {
            if (input) {
                // Don't calculate if input ends with an operator
                if ('+-*/'.includes(input[input.length - 1])) {
                    return;
                }
                setInput(calculate(input));
            }
        } else {
            // Prevent starting with an operator except minus
            if (input === '' && '+-*/'.includes(button) && button !== '-') {
                return;
            }
            // Prevent multiple operators in a row
            if ('+-*/'.includes(button)) { //if the button is an operator
                if ('+-*/'.includes(input[input.length - 1])) { // if last thing typed was also an operator
                    setInput(prevInput => prevInput.slice(0, -1) + button); // replace the last one with the new one
                    return; // stop here
                }
            }
            setInput(prevInput => prevInput + button);
        }
    };

    return (
        <div className='calculator'>
            <Display value={input}/>
            <div className='buttons'>
                {buttons.map((button, index) => (
                    <Button key={index} 
                    label={button} 
                    onClick={() => handleClick(button)} />
                ))}
            </div>
        </div>
    );
};