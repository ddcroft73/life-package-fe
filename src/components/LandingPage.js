import Box from "./elements/Box.js";

const LandingPage = () => {
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
            }}
        >
            <Box>
                <h1>Landing Page</h1>
            </Box>
        </Box>
    );
};

export default LandingPage;
