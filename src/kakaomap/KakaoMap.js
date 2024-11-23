import React, { useEffect, useRef, memo, useCallback, useState } from "react";
import axios from 'axios';
import qs from "qs";
import Loading from "./loading/Loading";
import { useLoading } from "./hook/useLoading";
import { useMarkers } from "./hook/useMarker";
import { useGeocording } from "./hook/useGeocording";
import { useInfoWindow } from "./hook/useInfoWindow";
import { useClusterer } from "./hook/useClusterer";
import { mapApi } from "./api/mapApi";

const { kakao } = window;

const mapLevel = 4;
const mapcenterlat = 37.56435977921398
const mapcenterlng = 126.97757768711558
const KakaoMap = memo(({ setCategoryRegion, handleMarkerData }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const oldAddressRef = useRef([]);
  const markersByRegionRef = useRef({});

  const { IsLoadingState, IsLoadingShow, IsLoadingClose } = useLoading();
  const { createMarkersFromData } = useMarkers();
  const { getRegionCode } = useGeocording();
  const { showInfoWindow } = useInfoWindow();
  const { clustererRef, createClusterer } = useClusterer();

  const getMarkerData = useCallback(async (marker, apartmentname) => {
    var markerData = marker.markerData;
    try {
      const response = await mapApi.getMarkerData(markerData, apartmentname);
      handleMarkerData(response.data);
    } catch (error) {
      console.error("거래내역 조회 실패 : " + error);
    }
  }, [handleMarkerData])

  const initMarkers = async (map) => {
    const coords = makearrcoords(map);
    const addressnameArr = [];
    const regionResults = await Promise.all(
      coords.map(async (coord, index) => {
        const regionArr = await getRegionCode(coord)
        return { regionArr, isCenter: index === 0 };
      })
    );

    regionResults.forEach(({ regionArr, isCenter }) => {
      addressnameArr.push(filterAddresses(regionArr));
      if (isCenter) {  // 중앙 좌표인 경우
        setCategoryRegion(regionArr.region_3depth_name);
      }
    });
    const filteredData = addressnameArr.filter((address, index) =>
      addressnameArr.indexOf(address) === index);

    const oldData = [];
    const newData = [];

    //이전 시도 시군구 목록에서 드래그한지도의 새로운 중앙, 북서, 북동, 남서, 남동 좌표의 시도,시군구가 없으면 삭제할 데이터로 푸쉬
    oldAddressRef.current.forEach((address) => {
      if (!filteredData.includes(address)) {
        oldData.push(address);
      }
    })
    
    //드래그한지도의 새로운 중앙, 북서, 북동, 남서, 남동 좌표의 시도,시군구가 이전 지도 시군구 목록에서 없으면 추가할 데이터로 푸쉬
    filteredData.forEach((address) => {
      if (!oldAddressRef.current.includes(address)) {
        newData.push(address);
      }
    })

    //삭제할 데이터로 푸쉬한 이전 시도,시군구 목록의 마커를 삭제
    oldData.forEach(region => {
      if (markersByRegionRef.current[region]) {
        clustererRef.current.removeMarkers(markersByRegionRef.current[region]);
        delete markersByRegionRef.current[region];
      }
    });

    //드래그한지도의 새로운 중앙, 북서, 북동, 남서, 남동 좌표의 시도,시군구를 이전 시도시군구 목록으로 교체
    oldAddressRef.current = filteredData;

    //추가할 데이터로 푸쉬한 새로운 지역 좌표들(Coords) 받아오기
    if (newData.length > 0) {
      const response = await getMarkers(newData);

      createMarkersFromData(response, showInfoWindow, getMarkerData, mapInstanceRef, markersByRegionRef, clustererRef)
    }

  }
  const filterAddresses = (regionArr) => {
    if (regionArr.region_1depth_name === '세종특별자치시')
      return regionArr.region_1depth_name;
    else if (regionArr.region_1depth_name === "-" && regionArr.region_2depth_name === "-" && regionArr.region_3depth_name === '-') {
      return "";
    } else {
      return regionArr.region_1depth_name + " " + regionArr.region_2depth_name;
    }
  }

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

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      const mapOption = {
        center: new kakao.maps.LatLng(mapcenterlat, mapcenterlng),
        level: mapLevel
      };
      const map = new kakao.maps.Map(mapRef.current, mapOption);
      mapInstanceRef.current = map;
      clustererRef.current = createClusterer(map);

      IsLoadingShow();
      initMarkers(mapInstanceRef.current).then(() => {
        IsLoadingClose();
      })
      kakao.maps.event.addListener(map, 'dragend', function () {
        if (map.getLevel() < 5) {
          IsLoadingShow();
          initMarkers(mapInstanceRef.current).then(() => {
            IsLoadingClose();
          })
        }
      });
    }

  }, [mapInstanceRef, clustererRef, createClusterer, initMarkers, IsLoadingShow, IsLoadingClose]);


  return (
    <>
      {IsLoadingState && <Loading></Loading>}
      <div ref={mapRef} style={styles.map}></div>
    </>)
})

const styles = {
  map: { width: "100%", height: "100%", position: "relative", zIndex: 0 },
}

export default KakaoMap;