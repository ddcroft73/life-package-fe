import Box from "./elements/Box.js";
import Logo from "./Logo.js";


const AdminDashboard = () => {
    return (
        <div id="background">
            <Logo marginTop={50} />
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "0px"
                }}
            >
                <Box>
                    <h1>Administration WorkStation</h1>.

                </Box>
            </Box>
        </div>
    );
};

export default AdminDashboard;
