import React, {memo} from "react";

const MainLayout = memo(({ children }) => {

    return (
        <div style={{
            minWidth: '1080px',
            maxWidth: '1920px',
            //width:'1920px',
            margin: '0 auto',
            height: '100vh',
          }}>
            {children}
          </div>
    )

})

export default MainLayout;