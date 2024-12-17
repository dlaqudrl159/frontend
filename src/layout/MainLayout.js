import { Box } from "@mui/material";
import React, {memo} from "react";


const MainLayout = memo(({ children }) => {

    return (
      <Box maxWidth="1920px" sx={{ overflow: 'hidden' }} 
      /*style={{
          minWidth: '1080px',
          maxWidth: '1920px',
          margin: '0 auto',
          height: '100vh',
          display: 'flex',  // 추가
          flexDirection: 'column',  // 추가
          overflow: 'hidden'  // 추가
        }}*/>
          {children}
        </Box>
    )

})

export default MainLayout;