import Box from "./elements/Box";
import {Link} from "react-router-dom";

function Links( {justifyContent="space-around", linkData} ) {

    return (
        <Box id="links"
            style={{ 
                border: "0px solid black", 
                fontSize: 13, 
                color: "#bd841b", 
                padding: 0, 
                paddingTop:4,
                display: 'flex',
                justifyContent: justifyContent,
                paddingBottom: 5,
                }}
        >
            <Box style={{border: "0px solid black", padding:0, marginLeft:10, marginTop: 3}}>
                <Link to={linkData.pathOne}>{linkData.textOne}</Link>
            </Box> 
            <Box style={{border: "0px solid black", padding:0, marginRight:10, marginTop: 3}}>
                <Link  to={linkData.pathTwo}>{linkData.textTwo}</Link>
            </Box> 

        </Box>     
    );
};

export default Links;