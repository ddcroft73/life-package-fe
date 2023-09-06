
import './ToggleSwitch.css';
import { useState } from 'react';

const ToggleSwitch = () => {
  
    const [isChecked, setIsChecked] = useState(false);
  
    const handleToggle = () => {
      setIsChecked(!isChecked);
    };
  
    return (
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className="slider"></span>
      </label>
    );
  };

  export default ToggleSwitch;