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

    return (
        <div className='calculator'>
            <Display value={input}/>
            <div className='buttons'>
                {buttons.map((button, index) => (
                    <Button key={index} label={button} onClick={() => setInput(input + button)} />
                ))}
            </div>
        </div>
    );
};
