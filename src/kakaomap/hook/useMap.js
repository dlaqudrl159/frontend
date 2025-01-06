import { useCallback } from "react";
import { useGeocording } from "./useGeocording";
import { useMarkers } from "./useMarker";
import { useInfoWindow } from "./useInfoWindow";
import { mapApi } from "../api/mapApi";

export const useMap = () => {

    const { kakao } = window;
    const mapLevel = 4;
    const mapCenterLat = 37.56435977921398
    const mapCenterLng = 126.97757768711558

    const { getRegionCode } = useGeocording();
    const { createMarkersFromData } = useMarkers();
    const { showInfoWindow } = useInfoWindow();

    const initializeMap = (mapElement) => {
        const mapOption = {
            center: new kakao.maps.LatLng(mapCenterLat, mapCenterLng),
            level: mapLevel
        };
        const map = new kakao.maps.Map(mapElement, mapOption);
        return map;
    }

    const addDragEventMap = (map, callback) => {
        kakao.maps.event.addListener(map, 'dragend', callback);
    }

    const addZoomChangeEventMap = (map, callback) => {
        kakao.maps.event.addListener(map, 'zoom_changed', callback);
    }

    const dragEventMap = (map, initMarkers, IsLoadingShow, IsLoadingClose) => {
        if (map.getLevel() < 5) {
            IsLoadingShow();
            initMarkers(map).then(() => {
                IsLoadingClose();
            })
        }
    }

    const ZoomChangeEventMap = (map, clustererRef, oldAddressRef, markersByRegionRef, initMarkers, IsLoadingShow, IsLoadingClose) => {
        const currentLevel = map.getLevel();
        if ((currentLevel - 1) === 4 && currentLevel === 5) {
            clustererRef.current.clear();
            oldAddressRef.current = [];
            markersByRegionRef.current = {};
        } else if ((currentLevel + 1) === 5 && currentLevel === 4 && clustererRef.current._markers.length === 0) {
            IsLoadingShow();
            initMarkers(map).then(() => {
                IsLoadingClose();
            });
        } else if ((clustererRef.current._markers.length === 0) && currentLevel < 4) {
            IsLoadingShow();
            initMarkers(map).then(() => {
                IsLoadingClose();
            });
        } else if (currentLevel > 5 && (clustererRef.current._markers.length !== 0)) {
            clustererRef.current.clear();
            oldAddressRef.current = [];
            markersByRegionRef.current = {};
        }
    }

    const createArrCoords = useCallback((map) => {
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
    }, [kakao.maps.LatLng])

    const filterAddresses = (regionArr) => {

        if (regionArr.region_1depth_name === "-" && regionArr.region_2depth_name === "-" && regionArr.region_3depth_name === '-') {
            return "";
        } if (regionArr.region_1depth_name === '세종특별자치시')
            return regionArr.region_1depth_name;
        else {
            const address = regionArr.addressname;
            const parts = address.split(' ');
            return parts.slice(0, 2).join(' ');
        }
    }


    const getMarkers = useCallback(async (addressnameArr) => {
        try {
            const response = await mapApi.getMarkers(addressnameArr);
            return response;
        } catch (error) {
            console.error(error);
            return "ERROR";
        }
    }, []);

    const initMarkers = useCallback(async (map, setCategoryRegionState, oldAddressRef, markersByRegionRef, clustererRef, getMarkerData, mapInstanceRef, infowindowRef) => {
        const coords = createArrCoords(map);

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

        const filteredData = addresses.filter((address, index) =>
            addresses.indexOf(address) === index);

        const oldData = [];
        const newData = [];

        oldAddressRef.current.forEach((address) => {
            if (!filteredData.includes(address)) {
                oldData.push(address);
            }
        })

        filteredData.forEach((address) => {
            if (!oldAddressRef.current.includes(address)) {
                newData.push(address);
            }
        })

        oldData.forEach(region => {
            //console.log("마커 삭제할 지역 = " + region);
            if (markersByRegionRef.current[region]) {
                //console.log("삭제 시작 = " + markersByRegionRef.current[region]);
                clustererRef.current.removeMarkers(markersByRegionRef.current[region]);
                delete markersByRegionRef.current[region];
            }
        });

        oldAddressRef.current = filteredData;

        if (newData.length > 0) {
            const response = await getMarkers(newData);
            if ("ERROR" === response) {
                return;
            }
            createMarkersFromData(response, showInfoWindow, getMarkerData, mapInstanceRef, markersByRegionRef, clustererRef, infowindowRef)
        }
    }, [createArrCoords, getRegionCode, createMarkersFromData, showInfoWindow, getMarkers])

    return { initializeMap, addDragEventMap, addZoomChangeEventMap, dragEventMap, ZoomChangeEventMap, initMarkers }

}