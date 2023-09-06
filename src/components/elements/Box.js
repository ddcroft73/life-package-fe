
const Box = ({ children, style }) => {
    
    const defaultStyle = {
        width: 'auto',
        height: 'auto',
        border: '1px solid black',
        borderRadius: '8px',
        padding: 10,
    };

    return (
        <div style={{ ...defaultStyle, ...style }}>
            {children}
        </div>
    );
}

export default Box;