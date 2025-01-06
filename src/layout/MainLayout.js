import { Box } from "@mui/material";
import React, { memo } from "react";
import { MainLayoutContainer } from "../styles/Layout.Styles";

const MainLayout = memo(({ children }) => {

  return (
    <MainLayoutContainer className="MainLayoutContainer">
      {children}
    </MainLayoutContainer>
  )

})

export default MainLayout;