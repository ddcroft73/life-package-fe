import Box from "./elements/Box.js";
import Logo from "./Logo.js";

const styles = {
    component_container: {
        display: "flex",
     //   justifyContent: "center",
     //   alignItems: "center",
        marginTop: "0px",
        maxWidth: 1200,
        minWidth: 375,
        width: "800px",
        height: 'auto',
    },
    left_container: {
        display: "flex",
        flex: 1,
        width: 200,
        height: 700,
        border: '1px solid white'
    },
    right_container: {
        display: "flex",
        flex: 2,
        width: 600,
        height: 700,
        border: '1px solid white'
    
    },
};
const AdminDashboard = () => {
    return (
        <div id="background">
            <Logo marginTop={50} />
            <Box
                style={styles.component_container}
            >
                <Box style={styles.left_container}>                    

                </Box>
                <Box style={styles.right_container}>
                    
                </Box>
            </Box>
        </div>
    );
};

export default AdminDashboard;
