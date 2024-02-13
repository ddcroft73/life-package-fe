import React from 'react';
import './InputBox.css';


const InputBox = ({ label, type="text" }) => {
  return (
    <div className="input-container">
      {label && <label style={{fontSize:13, fontWeight:"lighter"}}>{label}</label>}
      <input type={type} className="input-field" />
      <span className="focus-border">
       {/*<i></i> What the fuck is this even for? commented it out till I learn more*/}
      </span>
    </div>
  );
};

export default InputBox;
