
const Box = ({ children, style, caption="", color=""}) => {
    
    const defaultStyle = {
        width: 'auto',
        height: 'auto',
        border: '1px solid black',
        borderRadius: '8px',
        padding: 10,
        position: 'relative',
    };
    
    //Implement a caption so I can group elements
    const captionStyle = {
        fontSize: 12,
        position: 'absolute', 
        top: 0,
        left: 10, 
        transform: 'translateY(-50%)', // Adjust vertical position to sit on the border
        background: 'transparent', 
        padding: '0 5px',
        color: color
    };

    
    return (
        <div style={{ ...defaultStyle, ...style }}>
        {caption && <div style={captionStyle}>{caption}</div>}
        {children}
    </div>
    );
}

export default Box;