
import React from 'react';
import './TextBox.css';
/*
const TextBox = ({ label, width = '200px', height = "auto", ...props }) => {
  const containerStyle = {
    width,
    height
  };

  const inputStyle = {
    width,
    height   
  };

  return (
    <div className="floating-label-container" style={containerStyle}>
      <input 
        className="floating-label-input"
        style={inputStyle}
        placeholder=" "
        {...props} 
      />
      <label className="floating-label">{label}</label>
    </div>
  );
}

export default TextBox;
*/
const TextBox = ({ label, width = '200px', height = "auto", containerPadding = 0, ...props }) => {
  
    // Calculate the adjusted width based on container padding
    const adjustedWidth = `calc(${width} - ${(containerPadding) * 2}px)`;
  
    const containerStyle = {
      width: adjustedWidth,
      height
    };
  
    const inputStyle = {
      width: adjustedWidth,
      height   
    };
  
    return (
      <div className="floating-label-container" style={containerStyle}>
        <input 
          className="floating-label-input"
          style={inputStyle}
          placeholder=" "
          {...props} 
        />
        <label className="floating-label">{label}</label>
      </div>
    );
  }
  
  export default TextBox;
  