import Box from "./elements/Box.js";
import React, { useState } from 'react';
import Button from "./elements/Button.js"
import Paper from "./elements/Paper.js"

const TwoFactorAuth = ({ onSubmit }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  
    const handleChange = (index) => (e) => {
        const value = e.target.value;
        const newCode = [...code];
        
        if (value.match(/[0-9a-zA-Z]/)) {
            newCode[index] = value.toUpperCase(); 
            setCode(newCode);
        
            // Auto-focus the next input after a digit or letter is typed
            if (e.target.nextSibling) {
                e.target.nextSibling.focus();
            }
        }
    };

    const handleKeyDown = (index) => (e) => {
        // Allow backspace to clear the current input and then move to the previous input
        if (e.key === 'Backspace') {
          e.preventDefault();
      
          const newCode = [...code];
          // If there is a value in the current input, clear it
          if (code[index]) {
            newCode[index] = '';
            setCode(newCode);
          }
          // If the current input is already empty, delete the previous input's value
          else if (index > 0 && !code[index]) {
            newCode[index - 1] = '';
            setCode(newCode);
            // Move focus to the previous input
            const prevInput = e.target.previousSibling;
            if (prevInput) {
              prevInput.focus();
            }
          }
        }
      };
      
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(code.join(''))
    
    // send the code and the token to the srver to verify. The token basically just makes sure
    // its for the same email that logged in and it has a time limit. 

    // need to access localStorage to get the code and token, then send the users input, and token to the server
    // to auth when that comes back, save the Token, the user is good to go! unless there were errors.
  };

  return (
    <div style={styles.container}>
      <Paper elevation={6} style={styles.formBox}>
        <div style={styles.lockIcon}>🔒</div>
        <h1 style={styles.title}>Life Package</h1>
        <p style={styles.subtitle}>Enter 6-digit code You received via email or sms.</p>
        <form onSubmit={handleSubmit}>
        <div style={styles.inputsContainer}>
        {code.map((digitOrLetter, index) => (
            <input
            onKeyDown={handleKeyDown(index)}
            key={index}
            style={styles.input}
            type="text"
            maxLength="1"
            value={digitOrLetter}
            onChange={handleChange(index)}
            pattern="[0-9a-zA-Z]"   // This pattern allows digits and letters
            autoFocus={index === 0} // Focus the first input on mount
            />
        ))}
        </div>
          <Button type="submit" style={styles.button}>Submit</Button>
        </form>
      </Paper>
    </div>
  );
};




// Inline styles
const styles = {
  container: {
    display: 'flex', 
    marginTop: 20,
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 'auto', 
    backgroundColor: 'rgb(18, 17, 16)',
    fontFamily:  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;"
  },
  hyphen: {
    fontSize: '28px',
    alignSelf: 'center',
    color: 'white', // Set the color to match your design
    padding: '2px 5px', // Adjust spacing to align with your design
  },
  formBox: {
    backgroundColor: 'rgb(49, 46, 44)', 
    borderRadius: '10px', 
    textAlign: 'center',
   /* padding: '40px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',*/
    maxWidth: '370px',
    width: '100%',
    height: 'auto'
  },
  lockIcon: {
    fontSize: '32px',
    color: '#ffba00', // Color of the lock icon, adjust as needed
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '24px'
  },
  subtitle: {
    color: 'white',
    marginBottom: '20px'
  },
  inputsContainer: {
    display: 'flex', 
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '40px', 
    height: '50px', 
    margin: '0 5px', 
    fontSize: '32px', 
    textAlign: 'center',
    borderRadius: '6px', 
    border: '1px solid white', // Adjust as needed
    backgroundColor: 'rgb(33, 33, 33)',
    color: 'white'
  },
  button: {
    padding: '15px', 
    backgroundColor: '#484444', // Placeholder color, replace with the color you want
    color: 'white', 
     border: '1px solid white', 
    borderRadius: '8px', 
    cursor: 'pointer',
    fontSize: '20px',
    width: '90%', // Full-width button
  }
};

export default TwoFactorAuth;

 /*
  const handleChange = (index) => (e) => {
    const value = e.target.value;
    const newCode = [...code];
    
    if (value.match(/[0-9a-zA-Z]/)) {
      newCode[index] = value.toUpperCase(); // Convert to upper case
      setCode(newCode);
  
      // If current input is before the hyphen and a value has been entered, focus the next input
      if (index < 2 && value) {
        const nextInput = e.target.parentElement.children[index + 1];
        nextInput && nextInput.focus();
      } 
      // If current input is right before the hyphen, jump over the hyphen
      else if (index === 2 && value) {
        const nextInput = e.target.parentElement.children[index + 2]; // Skip over the hyphen
        nextInput && nextInput.focus();
      }
      // For inputs after the hyphen, continue as normal
      else if (index > 2 && value) {
        const nextInput = e.target.parentElement.children[index + 1];
        nextInput && nextInput.focus();
      }
    } else if (!value) {
      // If the input is cleared, reset its value in the state
      newCode[index] = '';
      setCode(newCode);
    }
  };
  
  const handleKeyDown = (index) => (e) => {
    if (e.key === 'Backspace') {
      // Prevent default behavior of backspace key
      e.preventDefault();
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
  
      // If current input is after the hyphen and is empty, move focus to the previous input
      if (index > 3 && !code[index]) {
        const prevInput = e.target.parentElement.children[index - 1];
        prevInput && prevInput.focus();
      }
      // If current input is right after the hyphen and is empty, jump back over the hyphen
      else if (index === 3 && !code[index]) {
        const prevInput = e.target.parentElement.children[index - 2]; // Skip over the hyphen
        prevInput && prevInput.focus();
      }
      // For inputs before the hyphen, continue as normal
      else if (index < 3 && !code[index]) {
        const prevInput = e.target.parentElement.children[index - 1];
        prevInput && prevInput.focus();
      }
    }
  };
  */