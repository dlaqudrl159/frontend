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
import { useMarkers } from "../kakaomap/hook/useMarker";

const SearchPanel = memo(({ searchData = {aptCoordsDto: []}, setSearchData, setInputRoadName, searchType, activeTab, setSelectedMarkerData, mapInstanceRef, initMarkers }) => {

  const { createCoords } = useMarkers();
  const sSearchData = searchData.aptCoordsDto;
  const { curPage, setCurPage, amount, totalPage, startNum, endNum, beginPageNum, finishPageNum } = usePagination(sSearchData);

  const currentItems = sSearchData.slice(startNum - 1, endNum);

  const handleApartmentName = useCallback(async (item) => {
    const response = await mapApi.getMarkerData(item, item.apartmentname);
    setSelectedMarkerData(response.data);
    const coords = createCoords(response.data[0].aptCoordsDto.lat, response.data[0].aptCoordsDto.lng);
    mapInstanceRef.current.setCenter(coords);
    mapInstanceRef.current.setLevel(2);
    initMarkers(mapInstanceRef.current)
  }, [setSelectedMarkerData, createCoords, mapInstanceRef, initMarkers])

  return (
    <SearchPanelContainer className="searchpanelcontainer">
      <SearchPanelHeader>
        <SearchPanelHeaderTitle
          variant="h6"
          component="h2" >
          검색결과
        </SearchPanelHeaderTitle>
        <SearchPanelHeaderCloseButton onClick={() => { setSearchData(null) }}>X</SearchPanelHeaderCloseButton>
      </SearchPanelHeader>
      <SearchPanelContent className="searchpanelcontent">
        {currentItems.map((item, index) => (
          <SearchPanelResultContainer className="searchpanelresultcontainer" key={index}>
            {(searchType === 'road' && activeTab === 'region') ? <RoadNameResult item={item} onClick={setInputRoadName} ></RoadNameResult>
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