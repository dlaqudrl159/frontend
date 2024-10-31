import React, { useEffect, useRef, memo, useCallback, useState } from "react";
import axios from 'axios';
import qs from "qs";
import Loading from "./Loading";

const { kakao } = window;

const geocoder = new kakao.maps.services.Geocoder();

const BasicMap = memo(({ setCategoryRegion, handleMarkerData }) => {
  console.log("BasicMap 함수부분")
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

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
          //console.log(result[i]);
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
      console.log(status);
    }
  }, [])

  const getMarkerData = useCallback((marker) => {
    return async function () {
      var markerlatlng = marker.getTitle().split('/');
      await axios.get('/api/getMarkerData', {
        params: {
          lat: markerlatlng[0],
          lng: markerlatlng[1]
        }
      }).then(response => {
        //console.log(response);
        handleMarkerData(response.data);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [handleMarkerData])

  const makermaking = useCallback((NameCountDtoList) => {
    const newMarkers = NameCountDtoList.data.map((NameCountDto) => {
      var coords = new kakao.maps.LatLng(NameCountDto.lat, NameCountDto.lng);
      var marker = new kakao.maps.Marker({
        title: NameCountDto.lat + "/" + NameCountDto.lng,
        position: coords,
      });
      kakao.maps.event.addListener(marker, 'click', getMarkerData(marker));
      return marker;
    });
    // 새 마커 추가
    newMarkers.forEach(marker => marker.setMap(mapInstanceRef.current));
    markersRef.current = newMarkers;
  }, [getMarkerData]);

  const get = useCallback(async (addressnameArr) => {
    try {
      const response = await axios.get("/api/get", {
        params: { addressnameArr: addressnameArr },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "comma" });
        }
      });
      return response;
    } catch (error) {
      console.log(error);
      //throw error;
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
                makermaking(response)
                resolve();
              })
              .catch(reject);
          }
        })
      })
    })

  }, [makearrcoords, displayCenterInfo, setCategoryRegion, get, makermaking])

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      const mapOption = {
        center: new kakao.maps.LatLng(37.56435977921398, 126.97757768711558),
        level: 4
      };
      const map = new kakao.maps.Map(mapRef.current, mapOption);
      mapInstanceRef.current = map;

      IsLoadingShow();
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      getMarkers(mapInstanceRef.current).then(() => {
        IsLoadingClose();
      });
      kakao.maps.event.addListener(map, 'dragend', function () {
        if (map.getLevel() < 5) {
          IsLoadingShow();
          markersRef.current.forEach(marker => marker.setMap(null));
          markersRef.current = [];
          getMarkers(mapInstanceRef.current).then(() => {
            IsLoadingClose();
          });
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