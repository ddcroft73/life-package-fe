
import './ToggleSwitch.css';

const ToggleSwitch = ( {value = false, onChange} ) => {
  
    const handleToggle = (event) => {
      if (onChange) {
        onChange(event.target.checked);
      }
    };
  
    return (
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={value}
          onChange={handleToggle}
        />
        <span className="slider"></span>
      </label>
    );
  };

  export default ToggleSwitch;