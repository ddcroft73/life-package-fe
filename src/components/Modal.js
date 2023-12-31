
import './Modal.css';
import Box from './elements/Box';
import Button from './elements/Button';
import Footer from './elements/Footer';


function Modal({ show, buttons, content, borderColor="blue"}) {
    /**
     * A Modal with one or two buttons, 
     */
    const styles = {
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, .8)",
          display: "flex",
          justifyContent: "center",
          alignItems: 'center',
          zIndex: 1000,
        },
        component_container: {
          border:"0px solid white", 
          width:"100%",
          paddingLeft:20,
          paddingRight:20,      
        },
        modal: {
          backgroundColor: "rgb(49, 46, 44)",
        //  padding: "20px",
          borderRadius: 8,
          width: "100%",
          display: 'flex',  
          flexDirection: 'column', 
          backgroundColor: "rgba(49, 46, 44, .624)",
          minWidth: 290,
          maxWidth: 450,
          height: 'auto',
          paddingLeft:10,
          paddingRight:10,
          border: `1px solid ${borderColor}`,
        },
        button: {
          flex: 1,
          backgroundColor: '#484444',
          padding: '10px 20px', 
          width: "100%",
        },
        modal_content: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: `0px solid ${borderColor}`,
          marginBottom: 20,
          paddingLeft:10,
          paddingRight:10,
        },
        modalActions: {
          display: "flex", 
          justifyContent: "space-between", // ensures that the buttons are pushed to either end
          padding: 0, 
        }
    };


    if (!show) return null;

    return (
      <div id="modal-overlay"
          style={styles.overlay}
      >
            <Box id="component-container"
                styles={{ ...styles.component_container}}
            >
                <Box id="modal"
                    style={{...styles.modal}} 
                >          
                    <Box id="modal-content" 
                        style={{ ...styles.modal_content}}
                    >
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
                
                    <Footer marginTop={20}/>
                </Box>
            </Box>
      </div>
    );
  };
  export default Modal;
  
  