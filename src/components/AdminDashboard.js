import Box from "./elements/Box.js";

const AdminDashboard = () => {
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px"
            }}
        >
            <Box>
                <h1>Administration Dashboard</h1>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
