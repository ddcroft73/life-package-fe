import Box from "./elements/Box.js";
import Logo from "./Logo.js";

const styles = {
    main_container: {
        display: "flex",        
        width: "900px",
        height: "650px",
        border: "1px solid white",
    },
    left_panel: {
        flexBasis: "25%",
        border: "1px solid white",
    },
    right_container: {
        display: "flex",
        flexDirection: "column",
        flexBasis: "75%",
        border: "1px solid white",
     },
     top_right: {
        flex: "0 0 60%",
        border: "1px solid white",
     },
     bottom_right: {
        flex: "0 0 40%",
        border: "1px solid white",

     },
};
const AdminDashboard = () => {
    return (
        <div id="background">
            <Logo marginTop={10} marginBottom={50} />
            
            <div id="main-container"
                style={styles.main_container}
            >
                <div id="left-panel"
                    style={styles.left_panel}
                >
                    Left Panel Content
                </div>
                <div id="right-container"
                    style={styles.right_container}
                >
                    <div id="top-right"
                        style={styles.top_right}
                    >
                        Top Right Content
                        
                    </div>
                    <div id="bottom-right"
                        style={styles.bottom_right}
                    >
                        Bottom Right Content
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
