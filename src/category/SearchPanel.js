import React, { memo } from "react";
import { usePagination } from "../pagination/usePagination";
import {
  SearchPanelContainer,
  SearchPanelHeader,
  SearchPanelContent,
  SearchPanelHeaderTitle,
  SearchPanelHeaderCloseButton,
  SearchPanelResultContainer,
  SearchPanelResult,
  SearchPanelFooter
} from "../styles/Category.Styles";
import Pagination from "../pagination/Pagination";

const SearchPanel = memo(({ searchData, setSearchData }) => {

  const sSearchData = searchData.aptCoordsDto || [];

  const { curPage, setCurPage, amount, totalPage, startNum, endNum, beginPageNum, finishPageNum } = usePagination(sSearchData);

  const currentItems = sSearchData.slice(startNum - 1, endNum);

  return (
    <SearchPanelContainer>
      <SearchPanelHeader>
        <SearchPanelHeaderTitle
          variant="h6"
          component="h2" >
          검색결과
        </SearchPanelHeaderTitle>
        <SearchPanelHeaderCloseButton onClick={() => { setSearchData(null) }}>X</SearchPanelHeaderCloseButton>
      </SearchPanelHeader>
      <SearchPanelContent>
        {currentItems.map((item, index) => (
          <SearchPanelResultContainer key={index}>
            <SearchPanelResult variant="body1">{item.roadname}</SearchPanelResult>
          </SearchPanelResultContainer>
        ))}
      </SearchPanelContent>
      <SearchPanelFooter>
      <Pagination curPage={curPage}
        setCurPage={setCurPage}
        beginPageNum={beginPageNum}
        finishPageNum={finishPageNum}
        totalPage={totalPage}></Pagination>
      </SearchPanelFooter>
    </SearchPanelContainer>
  )

});

export default SearchPanel;