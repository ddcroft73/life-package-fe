import React from 'react';
import './Button.css';


const Button = ({ children, style, onClick, ...props }) => {
    return (
        <button 
            className="button" 
            style={style} 
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
/*
const Button = ({ children, style, ...props }) => {
    const defaultStyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.1s ease', // added transform to the transition
        transform: 'scale(1)', // default scale
    };

    const hoverStyle = {
        backgroundColor: 'darkblue',
    };

    const activeStyle = {
        transform: 'scale(0.95)', // slightly reduce the size when clicked
    };

    return (
        <button 
            style={{ ...defaultStyle, ...style }} 
            onMouseOver={e => e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor}
            onMouseOut={e => {
                e.currentTarget.style.backgroundColor = defaultStyle.backgroundColor;
                e.currentTarget.style.transform = defaultStyle.transform; // Reset transform on mouse out
            }}
            onMouseDown={e => e.currentTarget.style.transform = activeStyle.transform}
            onMouseUp={e => e.currentTarget.style.transform = defaultStyle.transform}
            {...props}
        >
            {children}
        </button>
    );
}

*/
export default Button;
