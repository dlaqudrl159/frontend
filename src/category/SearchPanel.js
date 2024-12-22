import React, { memo, useCallback } from "react";
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
import RoadNameResult from "./RoadNameResult";
import ApartmentNameResult from "./ApartmentNameResult";
import { mapApi } from "../kakaomap/api/mapApi";
import { useLoading } from "../kakaomap/hook/useLoading";

const SearchPanel = memo(({ searchData, setSearchData, setInputRoadName, searchType, activeTab, setSelectedMarkerData }) => {

  const sSearchData = searchData.aptCoordsDto || [];

  const { curPage, setCurPage, amount, totalPage, startNum, endNum, beginPageNum, finishPageNum } = usePagination(sSearchData);

  const currentItems = sSearchData.slice(startNum - 1, endNum);

  const { IsLoadingState, IsLoadingShow, IsLoadingClose } = useLoading();

  const handleRoadName = useCallback((roadname) => {
    setInputRoadName(roadname);
  }, [setInputRoadName])

  const handleApartmentName = useCallback(async (item) => {
    IsLoadingShow()
    const response = await mapApi.getMarkerData(item, item.apartmentname);
    setSelectedMarkerData(response.data);
    IsLoadingClose();
  }, [setSelectedMarkerData, IsLoadingShow, IsLoadingClose])

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
          <SearchPanelResultContainer className="searchpanelresultcontainer" key={index}>
            {(searchType === 'road' && activeTab === 'region') ? <RoadNameResult item={item} onClick={handleRoadName} ></RoadNameResult>
              : activeTab === 'apartmentname' ? <ApartmentNameResult item={item} onClick={handleApartmentName}></ApartmentNameResult>
                : []}
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