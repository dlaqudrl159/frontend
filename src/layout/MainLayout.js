import React, { memo } from "react";
import { MainLayoutContainer } from "../styles/Layout.Styles";
import { Box } from "@mui/material";

const MainLayout = memo(({ children }) => {

  return (
    <MainLayoutContainer className="MainLayoutContainer">
      <Box sx={{height : '200px', width : '100%' , backgroundColor : 'red', position : "fixed", zIndex : '1'}}>header</Box>
      {children}
    </MainLayoutContainer>
  )

})

export default MainLayout;