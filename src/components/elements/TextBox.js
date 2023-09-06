import React from "react";
import "./TextBox.css";


const TextBox = ({ label, ...props }) => {
    return (
        <div className="floating-label-container">
            <input
                className="floating-label-input"
                placeholder=" "
                {...props}
            />
            <label className="floating-label">{label}</label>
        </div>
    );
};

export default TextBox;
