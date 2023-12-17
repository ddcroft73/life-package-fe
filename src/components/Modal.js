
import './Modal.css';
import Box from './elements/Box';
import Button from './elements/Button';


function Modal({ show, buttons, content, borderColor="blue"}) {
    /**
     * A Modal with one or two buttons, 
     */
    if (!show) return null;

    return (
      <div className="modal-overlay">
        <Box style={{
              display: 'flex',  
              flexDirection: 'column', 
              backgroundColor: "rgba(49, 46, 44, .324)",
              minWidth: 350,
              maxWidth: 400,
              height: 'auto',
              border: `1px solid ${borderColor}`,
              position: "relative", 
              top: -200, // adjust vertial alignment, more towards the top of the screen.
            }} className="modal">
  
            <Box style={styles.modalContent}>
                {content}
            </Box>
  
          <div style={styles.modalActions} className="modal-actions">
            {buttons.map((button, index) => (
              <Button
                key={index}
                style={{ ...styles.button, marginLeft: index > 0 ? '10px' : '0' }}
                onClick={button.handler}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </Box>
      </div>
    );
  };
  export default Modal;
  
  
  const styles = {
    button: {
      flex: 1,
      backgroundColor: '#484444',
      padding: '10px 20px', 
    },
    modalContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      border: "0px solid black"
    },
    modalActions: {
      display: "flex",
      justifyContent: "space-between", // ensures that the buttons are pushed to either end
      padding: '0px', 
    }
  }
  