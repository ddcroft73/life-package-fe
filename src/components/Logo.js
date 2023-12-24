import Box from "./elements/Box";

function Logo( {marginTop=0}) {
    
    return (
        <Box className="logo"
            style={{
                textAlign: "center",
                backgroundColor: "transparent ",//'#484444',
                border:"0px solid #817Daa",
                height:'auto',
                width:"auto", color: "gray",
                marginTop: marginTop
                }}
        >
            <div style={{
                fontSize: 54,
                color: "#817Dda"
                }}
            > {/* For another font if needed */}
            </div>
            <i style={{ color: "#819DCc", fontSize: 32}}
            className="fas fa-mail-bulk" />
            &nbsp;
            <span style={{
                    position: "relative",
                    top: 5,
                    fontSize:46,
                    fontWeight: "lighter"
                }}
            >|</span> 
            <span style={{fontSize: 30}}>LifePackage</span> <span style={{position: "relative", fontSize: 18, top: -8}}>&#8482;</span>                          
        </Box>
    );
};

export default Logo;