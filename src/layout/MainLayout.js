import React, { memo } from "react";
import { MainLayoutContainer } from "../styles/Layout.Styles";
import MainHeader from "./MainHeader";

const MainLayout = memo(({ children }) => {

  return (
    <MainLayoutContainer className="MainLayoutContainer">
      <MainHeader />
      {children}
    </MainLayoutContainer>
  )

})

export default MainLayout;