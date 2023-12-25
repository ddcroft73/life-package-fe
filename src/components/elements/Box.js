
const Box = ({ children, style, caption="", color="", labelBgColor=""}) => {
    
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
        top: -1,
        left: 10, 
        transform: 'translateY(-50%)', // Adjust vertical position to sit on the border
        background: labelBgColor, //'transparent', 
        padding: '3px 5px',
        borderRadius: 4,
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