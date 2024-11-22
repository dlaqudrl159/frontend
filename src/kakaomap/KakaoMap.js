import React, { useEffect, useRef, memo, useCallback, useState } from "react";
import axios from 'axios';
import qs from "qs";
import Loading from "./loading/Loading";
import { useLoading } from "./useLoading";
import { useMarkers } from "./useMarker";
import { useGeocording } from "./useGeocording";
import { useInfoWindow } from "./useInfoWindow";
import { useClusterer } from "./useClusterer";

const { kakao } = window;

const geocoder = new kakao.maps.services.Geocoder();

const mapLevel = 4;
const mapcenterlat = 37.56435977921398
const mapcenterlng = 126.97757768711558
const KakaoMap = memo(({ setCategoryRegion, handleMarkerData }) => {
  console.log("BasicMap 함수부분")
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const { IsLoadingState, IsLoadingShow, IsLoadingClose } = useLoading();
  const { createMarkersFromData } = useMarkers();
  const { displayCenterInfo } = useGeocording();
  const { showInfoWindow } = useInfoWindow();
  const { clustererRef , createClusterer } = useClusterer();

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

  const getMarkerData = useCallback((marker, apartmentname) => {
    return async function () {
      var markerData = marker.markerData;
      await axios.get('/api/getMarkerData', {
        params: {
          SIGUNGU: markerData.sigungu,
          BUNGI: markerData.bungi,
          APARTMENTNAME: apartmentname,
          LAT: markerData.lat,
          LNG: markerData.lng
        }
      }).then(response => {
        handleMarkerData(response.data);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [handleMarkerData])

  const makermaking = useCallback((response) => {
    if (response.data) {
      const newMarkers = createMarkersFromData(response.data , showInfoWindow , getMarkerData , mapInstanceRef.current);
      clustererRef.current.addMarkers(newMarkers);
    } else {
      alert("에러발생");
    }
  }, [clustererRef, createMarkersFromData, getMarkerData, showInfoWindow]);

  const get = useCallback(async (addressnameArr) => {
    try {
      const response = await axios.get("/api/getMarkers", {
        params: { addressnameArr: addressnameArr },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "comma" });
        }
      });
      return response;
    } catch (error) {
      return "ERROR";
    }
  }, []);

  const getMarkers = useCallback((map) => {
    return new Promise((resolve, reject) => {
      var addressnameArr = [];
      var count = 0;
      const totalcount = 5;

      makearrcoords(map).forEach(coords => {
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), function (result, status) {
          var regionArr = displayCenterInfo(result, status);

          addressnameArr.push(regionArr.addressname);
          if (count === 0) {
            setCategoryRegion(regionArr.region_3depth_name);
          }
          count++;
          if (count === totalcount) {
            get(addressnameArr)
              .then(response => {
                if (response !== "ERROR") {
                  makermaking(response)
                } else {
                  console.error('마커 데이터 조회 실패');
                }
                resolve();
              })
              .catch(error => {
                console.error('마커 데이터 처리 중 오류:', error);
                resolve();
              })
          }
        })
      })
    })

  }, [makearrcoords, displayCenterInfo, setCategoryRegion, get, makermaking])

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
      clustererRef.current.clear();
      getMarkers(mapInstanceRef.current).then(() => {
        IsLoadingClose();
      })
      kakao.maps.event.addListener(map, 'dragend', function () {
        if (map.getLevel() < 5) {
          IsLoadingShow();
          clustererRef.current.clear();
          getMarkers(mapInstanceRef.current).then(() => {
            IsLoadingClose();
          })
        }
      });
    }

  }, [mapInstanceRef, clustererRef, createClusterer, getMarkers, IsLoadingShow, IsLoadingClose]);


  return (
    <>
      {console.log("BasicMap 렌더")}
      {IsLoadingState && <Loading></Loading>}
      <div ref={mapRef} style={styles.map}></div>
    </>)
})

const styles = {
  map: { width: "100%", height: "100%", position: "relative", zIndex: 0 },
}

export default KakaoMap;