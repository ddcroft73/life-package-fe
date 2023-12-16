import Box from "./elements/Box";


function Or( {  title = ''  }) {

    return (
        <Box style={{border: "0px solid gray", alignItems: "center",  height:23, display: 'flex', lineHeight: 0, fontSize: 14, width: "100%"}}>
           <div className="hr"></div> 
            &nbsp;&nbsp;&nbsp;{title.length > 0 ? title : 'Or'}&nbsp;&nbsp;&nbsp;
            <div className="hr"></div>
        </Box>
    );
}

export default Or;