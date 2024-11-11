import React, { useEffect, useRef, memo, useCallback, useState } from "react";
import axios from 'axios';
import qs from "qs";
import Loading from "./Loading";

const { kakao } = window;

const geocoder = new kakao.maps.services.Geocoder();

const mapLevel = 4;
const mapcenterlat = 37.56435977921398
const mapcenterlng = 126.97757768711558
const BasicMap = memo(({ setCategoryRegion, handleMarkerData }) => {
  console.log("BasicMap 함수부분")
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const overlayRef = useRef(null);

  const [IsLoadingState, setIsLoadingState] = useState(true);
  const IsLoadingShow = useCallback(() => setIsLoadingState(true), [])
  const IsLoadingClose = useCallback(() => setIsLoadingState(false), [])

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

  const displayCenterInfo = useCallback((result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      for (var i = 0; i < result.length; i++) {
        // 행정동의 region_type 값은 'H' 이므로
        if (result[i].region_type === 'H') {
          var arr = {
            addressname: result[i].address_name,
            region_1depth_name: result[i].region_1depth_name,
            region_2depth_name: result[i].region_2depth_name,
            region_3depth_name: result[i].region_3depth_name
          };
          return arr;
        }
      }
    } else {
      console.error('지오코딩 에러:', status);
      return null;
    }
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

  const showInfoWindow = useCallback((marker, items, map) => {
    // 기존 InfoWindow가 있다면 닫기
    if (overlayRef.current) {
      overlayRef.current.close();
    }
  
    const content = `
      <div style="padding:15px;min-width:300px;">
        <div style="font-weight:bold;margin-bottom:10px;">위치 선택</div>
        ${items.map((item, index) => 
          `<div class="info-item" style="padding:8px;cursor:pointer;font-size:15px" 
            onclick="window.selectApartment('${item.apartmentname}')">
            ${item.apartmentname}
          </div>`
        ).join('')}
      </div>
    `;
  
    // 전역 함수로 등록
    window.selectApartment = function(apartmentname) {
      getMarkerData(marker, apartmentname)();
      overlayRef.current.close();
    };
  
    const infowindow = new kakao.maps.InfoWindow({
      content: content,
      removable: true
    });
  
    infowindow.open(map, marker);
    overlayRef.current = infowindow;
  }, [getMarkerData]);

  const makermaking = useCallback((LatLngDtoList) => {
    if (LatLngDtoList.data) {

      const groupedData = LatLngDtoList.data.reduce((acc, item) => {
        const key = `${item.lat},${item.lng}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});
      
      const newMarkers = Object.entries(groupedData).map(([coordKey, items]) => {
        const [lat, lng] = coordKey.split(',');
        const coords = new kakao.maps.LatLng(lat, lng);
        var marker;
        
          marker = new kakao.maps.Marker({
            title: items.length > 1 ? `${items[0].apartmentname} 외 ${items.length - 1}곳` : items[0].apartmentname,
            position: coords,
          });
          marker.markerData = {
            lat: lat,
            lng: lng,
            sigungu: items[0].sigungu,
            bungi: items[0].bungi
          };
        
        // 마커 클릭 이벤트 수정
        kakao.maps.event.addListener(marker, 'click', async function () {
          if (items.length > 1) {
            // 여러 데이터가 있는 경우 오버레이 표시
            showInfoWindow(marker, items, mapInstanceRef.current);
          } else {
            // 단일 데이터인 경우 기존처럼 처리
            getMarkerData(marker, marker.getTitle())();
          }
        });

        return marker;
      });
      // 새 마커 추가
      newMarkers.forEach(marker => marker.setMap(mapInstanceRef.current));
      markersRef.current = newMarkers;
    } else {
      //alert("에러발생");
    }

  }, [getMarkerData, showInfoWindow]);

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

      IsLoadingShow();
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      getMarkers(mapInstanceRef.current).then(() => {
        IsLoadingClose();
      })
      kakao.maps.event.addListener(map, 'dragend', function () {
        if (map.getLevel() < 5) {
          IsLoadingShow();
          markersRef.current.forEach(marker => marker.setMap(null));
          markersRef.current = [];
          getMarkers(mapInstanceRef.current).then(() => {
            IsLoadingClose();
          })
        }
      });
    }

  }, [getMarkers, IsLoadingShow, IsLoadingClose]);


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

export default BasicMap;