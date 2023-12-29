
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
        <Box styles={{ border:"0px solid white", width:"100px",paddingLeft:20,paddingRight:20}}>
            <Box style={{
                  display: 'flex',  
                  flexDirection: 'column', 
                  backgroundColor: "rgba(49, 46, 44, .624)",
                  minWidth: 350,
                  maxWidth: 400,
                  height: 'auto',
                  paddingLeft:20,paddingRight:20,
                  border: `1px solid ${borderColor}`,
                }} className="modal">
      
                <Box style={{ ...styles.modalContent}}>
                    {content}
                </Box>
      
              <Box style={styles.modalActions} className="modal-actions">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    style={{ ...styles.button, marginLeft: index > 0 ? '10px' : '0' }}
                    onClick={button.handler}
                  >
                    {button.text}
                  </Button>
                ))}
              </Box>
            </Box>
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
      border: `0px solid black`,
      marginBottom: 20,
      paddingLeft:20,paddingRight:20
    },
    modalActions: {
      display: "flex",
      justifyContent: "space-between", // ensures that the buttons are pushed to either end
      padding: '0px', 
    }
  }
  