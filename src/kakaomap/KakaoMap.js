import React, { useEffect, useRef, memo, useCallback, useState } from "react";
import axios from 'axios';
import qs from "qs";
import Loading from "./loading/Loading";
import useLoading from "./useLoading";

const { kakao } = window;

const geocoder = new kakao.maps.services.Geocoder();

const mapLevel = 4;
const mapcenterlat = 37.56435977921398
const mapcenterlng = 126.97757768711558
const KakaoMap = memo(({ setCategoryRegion, handleMarkerData }) => {
  console.log("BasicMap 함수부분")
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const overlayRef = useRef(null);
  const clustererRef = useRef(null);

  const { IsLoadingState, IsLoadingShow, IsLoadingClose } = useLoading();

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

    if (status !== kakao.maps.services.Status.OK) { console.error('지오코딩 에러:', status); return null };

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

    const content = document.createElement('div');
    content.style.padding = '15px';
    content.style.minWidth = '300px';

    const title = document.createElement('div');
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    title.textContent = '위치 선택';
    content.appendChild(title);

    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'info-item';
      itemDiv.style.padding = '8px';
      itemDiv.style.cursor = 'pointer';
      itemDiv.style.fontSize = '15px';
      itemDiv.textContent = item.apartmentname;
      itemDiv.onclick = () => {
        window.selectApartment(item.apartmentname);
      };
      content.appendChild(itemDiv);
    });
    // 전역 함수로 등록
    window.selectApartment = function (apartmentname) {
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

      //"https://www.flaticon.com/kr/free-icons/" title="채점자 아이콘">채점자 아이콘 제작자: Pixel perfect - Flaticon
      const icon = new kakao.maps.MarkerImage(
        '/marker2.png', // 집 모양 아이콘
        new kakao.maps.Size(40, 40), // 마커 크기
        {
          offset: new kakao.maps.Point(20, 40), // 마커 중심점
          alt: "부동산 마커",
          shape: "rectangle"
        }
      );

      const newMarkers = Object.entries(groupedData).map(([coordKey, items]) => {
        const [lat, lng] = coordKey.split(',');
        const coords = new kakao.maps.LatLng(lat, lng);
        var marker;

        marker = new kakao.maps.Marker({
          title: items.length > 1 ? `${items[0].apartmentname} 외 ${items.length - 1}곳` : items[0].apartmentname,
          position: coords,
          image: icon
        });
        marker.markerData = {
          lat: lat,
          lng: lng,
          sigungu: items[0].sigungu,
          bungi: items[0].bungi
        };

        // 마커 클릭 이벤트 수정
        kakao.maps.event.addListener(marker, 'click', async function () {
          items.length > 1 ? showInfoWindow(marker, items, mapInstanceRef.current) : getMarkerData(marker, marker.getTitle())();
        });

        return marker;
      });

      clustererRef.current.addMarkers(newMarkers);

    } else {
      alert("에러발생");
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

      const clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
        minLevel: 4, // 클러스터 할 최소 지도 레벨 
        MinClusterSize: 10,
        calculator: [50, 100],
        gridSize: 120,
        disableClickZoom: true
      });
      clustererRef.current = clusterer;

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

export default KakaoMap;