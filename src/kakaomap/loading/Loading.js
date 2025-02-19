import React, { memo } from "react";
import { LoadingContainer, LoadingContent, LoadingP } from "../../styles/Loading.Styles";

const Loading = memo(() => {
  
  return (
      <LoadingContainer className = "loadingContainer">
        <LoadingContent >
          <LoadingP>로딩중</LoadingP>
        </LoadingContent>
      </LoadingContainer>
  )
})

export default Loading;