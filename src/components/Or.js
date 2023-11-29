import Box from "./elements/Box";


function Or() {

    return (
        <Box style={{border: "0px solid black", height:23, display: 'flex', lineHeight: 0, fontSize: 14, width: "100%"}}>
            <div className="hr"></div> 
            &nbsp;&nbsp;&nbsp;Or&nbsp;&nbsp;&nbsp;
            <div className="hr"></div>
        </Box>
    );
}

export default Or;