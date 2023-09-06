
const Box = ({ children, style }) => {
    
    const defaultStyle = {
        width: '100%',
        height: '100%',
        border: '1px solid black',
        borderRadius: '8px',
    };

    return (
        <div style={{ ...defaultStyle, ...style }}>
            {children}
        </div>
    );
}

export default Box;