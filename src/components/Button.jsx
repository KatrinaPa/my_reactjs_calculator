import React from 'react';
import './Button.css';

const Button = ({ label, onClick }) => {
    const isOperator = '+-*/'.includes(label);
    const isSpecial = label === 'C' || label === '=';

    return (
        <button 
            className="button"
            onClick={onClick}
            data-operator={isOperator}
            data-special={isSpecial}
        >
            {label}
        </button>
    );
};

export default Button;