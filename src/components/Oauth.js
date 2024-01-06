import Box from "./elements/Box";
import { useNavigate, Link, useLocation} from "react-router-dom";


const Oauth = ({ marginTop=0, marginBottom=8, color="#817Daa", fontSize=26}) => {

    const navigate = useNavigate();

    const styles = {
        oauth: {
            fontSize: fontSize,
            border: '0px solid gray',
            padding: 2,
            cursor: "pointer",
            color: color,
        },
        outer_container: {
            border: "0px solid gray", 
            width: "100%", 
            display: "flex", 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 100, 
            marginTop: marginTop,
            marginBottom: marginBottom    
        },
        inner_icon_container: {
            display: 'flex', 
            border: "0px solid black", 
            padding: 0,
            gap: 5
        },
    };
    const handleClick = () => {
        navigate("/admin-dashboard")
    };


    return(
        <Box id="outer-container"
            style={styles.outer_container}
        >
            <Box id="inner-icon-container" 
                style={styles.inner_icon_container}
            >
                <div id="oauth-container" 
                    style={styles.oauth}
                >
                    <i className="fa-brands fa-facebook-f" onClick={handleClick}/>
                </div>
                <div id="oauth-container" 
                    style={styles.oauth}
                >
                    <i className="fa-brands fa-google" />
                </div>              
            </Box>                                  
        </Box>
    );
};

export default Oauth;