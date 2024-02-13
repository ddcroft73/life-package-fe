import React from 'react';

const styles = {
    mainContainer: {
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        width: "100vw",
    },
    navBar: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' 
    },
    mainContentContainer: {
        display: 'flex', flexDirection: 'row', flexGrow: 1 
    }
    
};


const Layout = ({ sidebarLeft, sidebarRight, navbar, footer, children }) => {
    return (
        <div style={{...styles.mainContainer}}>
            <div style={{...styles.navBar }}>
                {navbar}
            </div>

            <div style={{ }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {sidebarLeft}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                    {children} {/* Main content area */}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {sidebarRight}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {footer}
            </div>

        </div>
    );
};

export default Layout;
