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
import { useDispatch, useSelector } from "react-redux";
import { useMarkers } from "../kakaomap/hook/useMarker";
import { setMapCenter } from "../redux/reducer/action";

const SearchPanel = memo(({ searchData, setSearchData, setInputRoadName, searchType, activeTab, setSelectedMarkerData, mapInstanceRef }) => {

  const { createCoords } = useMarkers();
  const sSearchData = searchData.aptCoordsDto || [];
  console.log(mapInstanceRef.current);
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
    const coords = createCoords(response.data[0].aptCoordsDto.lat, response.data[0].aptCoordsDto.lng);
    mapInstanceRef.current.setCenter(coords);
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