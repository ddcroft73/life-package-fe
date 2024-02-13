//import React from 'react';

// This is my answer to using simple-flexbox. I was going to use it, but it requires React 17.X, and then I realized i actually know enough
// flexbox to make the layout I wanted.
//   This has since inspired me to emulate any other 3rd party components, or packages I may want to use. THese dependency issues are a pain in the ass.
//   So I'm just going to write anything I need, and\or get AI to help me in this endeavor. My UI my come out looking like shit, but it will work with no issues
//   and if the app takes off, I;ll pay a FE dev to re build it.    

const UsersLayout = ({ deadspace,  navbar, footer, children }) => {
    return (
        <div id="outer-container"
            style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw' }}>

            <div id="dead-space-left"
                style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                {deadspace}
            </div>

            <div id="inner-container"
                style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100vw' }}>        

                <div id="navbar"
                    style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'space-between', alignItems: 'center' , background: "transparent"}}>
                        {navbar}
                    </div>
                    {children} {/* Main content area */}
                    <div id="footer"
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {footer}
                    </div>
                </div>                                 
            </div>

            <div id="dead-space-right"
                style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                {deadspace}
            </div>

        </div>
    );
};

export default UsersLayout;
