import Box from "./elements/Box.js";

const UserDashboard = () => {
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
                <h1>User Dashboard</h1>
            </Box>
        </Box>
    );
};

export default UserDashboard;
