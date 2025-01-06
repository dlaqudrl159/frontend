import React, { memo } from "react";
import TabDropDown from "./tab/TabDropDown";
import { ChoiceContainer, ChoiceButton, ChoiceButtonContent } from "../styles/Category.Styles";

const Choice = memo(({ searchType, handleSelectState }) => {

  return (
    <TabDropDown>
      <ChoiceContainer className="choiceContainer">
        <ChoiceButton variant={searchType === 'jibun' ? "contained" : "text"} onClick={handleSelectState}>
          <ChoiceButtonContent>지번 검색</ChoiceButtonContent>
        </ChoiceButton>
        <ChoiceButton variant={searchType === 'road' ? "contained" : "text"} onClick={handleSelectState}>
          <ChoiceButtonContent>도로명 검색</ChoiceButtonContent>
        </ChoiceButton>
      </ChoiceContainer>
    </TabDropDown>
  )

})

export default Choice;