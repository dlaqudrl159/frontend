import React, { useEffect, useRef, memo, useCallback, useState } from "react";
import Loading from "./loading/Loading";
import { useLoading } from "./hook/useLoading";
import { useMarkers } from "./hook/useMarker";
import { useGeocording } from "./hook/useGeocording";
import { useInfoWindow } from "./hook/useInfoWindow";
import { useClusterer } from "./hook/useClusterer";
import { mapApi } from "./api/mapApi";

import { useMap } from "./hook/useMap";
import Category from "../category/Category";
import AptTranscationHistory from "../aptTranscationHistory/AptTranscationHistory";
import { KakaoMapContainer } from "../styles/KakaoMap.Styles";

const { kakao } = window;

const KakaoMap = memo(() => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const oldAddressRef = useRef([]);
  const markersByRegionRef = useRef({});
  const clustererRef = useRef(null);
  const infowindowRef = useRef(null);

  const [categoryRegionState, setCategoryRegionState] = useState(null);
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);

  const { initializeMap, addDragEventMap, addZoomChangeEventMap, dragEventMap, ZoomChangeEventMap } = useMap();
  const { IsLoadingState, IsLoadingShow, IsLoadingClose } = useLoading();
  const { createMarkersFromData } = useMarkers();
  const { getRegionCode } = useGeocording();
  const { showInfoWindow } = useInfoWindow();
  const { createClusterer } = useClusterer();

  const getMarkerData = useCallback(async (marker, apartmentname) => {
    var markerData = marker.markerData;
    try {
      IsLoadingShow();
      const response = await mapApi.getMarkerData(markerData, apartmentname);
      setSelectedMarkerData(response.data);
      IsLoadingClose();
    } catch (error) {
      console.error("거래내역 조회 실패 : " + error);
    }
  }, [setSelectedMarkerData, IsLoadingShow, IsLoadingClose])



  const filterAddresses = useCallback((regionArr) => {

    if (regionArr.region_1depth_name === "-" && regionArr.region_2depth_name === "-" && regionArr.region_3depth_name === '-') {
      return "";
    } if (regionArr.region_1depth_name === '세종특별자치시')
      return regionArr.region_1depth_name;
    else {
      const address = regionArr.addressname;
      const parts = address.split(' ');
      return parts.slice(0, 2).join(' ');
    }
  },[])

  const makearrcoords = useCallback((map) => {
    var mapBounds = map.getBounds();
    var sWLatLng = mapBounds.getSouthWest();
    var neLatLng = mapBounds.getNorthEast();
    var sWLat = sWLatLng.getLat();
    var sWLng = sWLatLng.getLng();
    var neLat = neLatLng.getLat();
    var neLng = neLatLng.getLng();
    var ss = new kakao.maps.LatLng(sWLat, sWLng);
    var sn = new kakao.maps.LatLng(sWLat, neLng);
    var ns = new kakao.maps.LatLng(neLat, sWLng);
    var nn = new kakao.maps.LatLng(neLat, neLng);

    var arrcoords = [map.getCenter(), ss, sn, ns, nn];
    return arrcoords;
  }, [])

  const getMarkers = useCallback(async (addressnameArr) => {
    try {
      const response = await mapApi.getMarkers(addressnameArr);
      return response;
    } catch (error) {
      console.error(error);
      return "ERROR";
    }
  }, []);

  const initMarkers = useCallback(async (map) => {
    const coords = makearrcoords(map);
    const addresses = [];
    const regionResults = await Promise.all(
      coords.map(async (coord, index) => {
        const regionArr = await getRegionCode(coord)
        return { regionArr, isCenter: index === 0 };
      })
    );

    regionResults.forEach(({ regionArr, isCenter }) => {
      // console.log(regionArr);
      const filterAddress = filterAddresses(regionArr);
      //console.log("filterAddress = " + filterAddress);
      if (filterAddress !== " ") {
        addresses.push(filterAddress);
      }
      if (isCenter) {  // 중앙 좌표인 경우
        setCategoryRegionState(regionArr.region_3depth_name);
      }
    });
    //console.log("addresses = " + addresses);
    const filteredData = addresses.filter((address, index) =>
      addresses.indexOf(address) === index);
    //console.log("중복제거 데이터 filteredData = " + filteredData)
    const oldData = [];
    const newData = [];
    //console.log("oldAddressRef.current = " + oldAddressRef.current);
    //이전 시도 시군구 목록에서 드래그한지도의 새로운 중앙, 북서, 북동, 남서, 남동 좌표의 시도,시군구가 없으면 삭제할 데이터로 푸쉬
    oldAddressRef.current.forEach((address) => {
      if (!filteredData.includes(address)) {
        oldData.push(address);
      }
    })
    //console.log("oldData = " + oldData);
    //드래그한지도의 새로운 중앙, 북서, 북동, 남서, 남동 좌표의 시도,시군구가 이전 지도 시군구 목록에서 없으면 추가할 데이터로 푸쉬
    filteredData.forEach((address) => {
      if (!oldAddressRef.current.includes(address)) {
        newData.push(address);
      }
    })
    //console.log("newData = " + newData);
    //삭제할 데이터로 푸쉬한 이전 시도,시군구 목록의 마커를 삭제
    oldData.forEach(region => {
      //console.log("마커 삭제할 지역 = " + region);
      if (markersByRegionRef.current[region]) {
        //console.log("삭제 시작 = " + markersByRegionRef.current[region]);
        clustererRef.current.removeMarkers(markersByRegionRef.current[region]);
        delete markersByRegionRef.current[region];
      }
    });
    //console.log("남은 마커 = " + markersByRegionRef.current);
    //드래그한지도의 새로운 중앙, 북서, 북동, 남서, 남동 좌표의 시도,시군구를 이전 시도시군구 목록으로 교체
    oldAddressRef.current = filteredData;
    //console.log("새로운 old지역 = " + oldAddressRef.current);
    //추가할 데이터로 푸쉬한 새로운 지역 좌표들(Coords) 받아오기
    if (newData.length > 0) {
      const response = await getMarkers(newData);
      if ("ERROR" === response) {
        return;
      }
      createMarkersFromData(response, showInfoWindow, getMarkerData, mapInstanceRef, markersByRegionRef, clustererRef, infowindowRef)
    }

  }, [clustererRef, createMarkersFromData, getMarkerData, getMarkers, getRegionCode, makearrcoords, setCategoryRegionState, showInfoWindow, filterAddresses])

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {

      const map = initializeMap(mapRef.current);
      mapInstanceRef.current = map;
      clustererRef.current = createClusterer(map);

      IsLoadingShow();
      initMarkers(mapInstanceRef.current).then(() => {
        IsLoadingClose();
      })
      addDragEventMap(mapInstanceRef.current, () => { dragEventMap(mapInstanceRef.current, initMarkers, IsLoadingShow, IsLoadingClose) });
      addZoomChangeEventMap(mapInstanceRef.current, () => { ZoomChangeEventMap(mapInstanceRef.current, clustererRef, oldAddressRef, markersByRegionRef, initMarkers, IsLoadingShow, IsLoadingClose) });

    }

  }, [mapInstanceRef, clustererRef, createClusterer, initMarkers, IsLoadingShow, IsLoadingClose, initializeMap, ZoomChangeEventMap, addDragEventMap, addZoomChangeEventMap, dragEventMap]);


  return (
    <>
      {IsLoadingState &&
        <Loading />}
      <KakaoMapContainer
        className="kakaoMapContainer"
        ref={mapRef} />
      {categoryRegionState &&
        <Category
          categoryRegionState={categoryRegionState}
          setSelectedMarkerData={setSelectedMarkerData}
          mapInstanceRef={mapInstanceRef}
          initMarkers={initMarkers}
        />}
      {selectedMarkerData &&
        <AptTranscationHistory
          selectedMarkerData={selectedMarkerData}
          setSelectedMarkerData={setSelectedMarkerData}
        />}
    </>)
})

export default KakaoMap;