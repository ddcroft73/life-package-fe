
import './Modal.css';
import Box from './elements/Box';


function Modal({ show, buttons, content }) {
    /**
     * A Modal with one or two buttons, 
     */
    if (!show) return null;
  
    return (
      <div className="modal-overlay">
        <Box style={{
              display: 'flex',  
              flexDirection: 'column', 
              backgroundColor: "rgba(49, 46, 44, .8)",
              minWidth: 350,
              maxWidth: 400,
              height: 'auto'
            }} className="modal">
  
            <Box style={styles.modalContent}>
                {content}
            </Box>
  
          <div style={styles.modalActions} className="modal-actions">
            {buttons.map((button, index) => (
              <button
                key={index}
                style={{ ...styles.button, marginLeft: index > 0 ? '10px' : '0' }}
                onClick={button.handler}
              >
                {button.text}
              </button>
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
  