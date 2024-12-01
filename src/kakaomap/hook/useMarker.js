import React, { useCallback, useMemo } from "react";

const { kakao } = window;

export const useMarkers = () => {

  //"https://www.flaticon.com/kr/free-icons/" title="채점자 아이콘">채점자 아이콘 제작자: Pixel perfect - Flaticon
  const icon = useMemo(() => {
    const size = new kakao.maps.Size(40, 40);

    const point = new kakao.maps.Point(20, 40);

    return new kakao.maps.MarkerImage(
      '/marker2.png', // 집 모양 아이콘
      size, // 마커 크기
      {
        offset: point, // 마커 중심점
        alt: "부동산 마커",
        shape: "rectangle"
      }
    )
  }, []);

  const markerEventListener = useCallback((marker, callback) => {
    kakao.maps.event.addListener(marker, 'click', callback);
  }, [])

  const createCoords = useCallback((lat, lng) => {
    const coords = new kakao.maps.LatLng(lat, lng);
    return coords;
  }, [])

  const createMarker = useCallback((title, position, image, lat, lng, sigungu, bungi) => {
    const marker = new kakao.maps.Marker({
      title: title,
      position: position,
      image: image,

    });
    marker.markerData = { lat, lng, sigungu, bungi }
    return marker;
  }, [])

  const getRegionKey = (sigungu) => {
    const parts = sigungu.split(' ');
    // 세종특별자치시인 경우
    if (parts[0] === '세종특별자치시') {
      return '세종특별자치시';
    }
    // 나머지 지역
    return parts.slice(0, 2).join(' '); // "서울특별시 중구"
  };

  const createMarkersFromData = useCallback((response, showInfoWindow, getMarkerData, mapInstanceRef, markersByRegionRef, clustererRef) => {
    console.log(response);
    const groupedData = response.data.reduce((acc, item) => {
      const regionKey = getRegionKey(item.sigungu);
      const coordKey = `${item.lat},${item.lng}`;
      if (!acc[regionKey]) {
        acc[regionKey] = {};
      }
      if (!acc[regionKey][coordKey]) {
        acc[regionKey][coordKey] = [];
      }
      acc[regionKey][coordKey].push(item);
      return acc;
    }, {});
    const newMarkers = Object.entries(groupedData).map(([regionKey, coordsGroup]) => {

      const markers = Object.entries(coordsGroup).map(([coordKey, items]) => {
        const [lat, lng] = coordKey.split(',');
        const coords = createCoords(lat, lng);
        const title = items.length > 1 ? `${items[0].apartmentname} 외 ${items.length - 1}곳` : items[0].apartmentname;
        const sigungu = items[0].sigungu;
        const bungi = items[0].bungi;
       
        const marker = createMarker(title, coords, icon, lat, lng, sigungu, bungi);
        markerEventListener(marker, () =>
          items.length > 1 ? showInfoWindow(marker, items, mapInstanceRef.current, getMarkerData)
            :
            getMarkerData(marker, marker.getTitle()));

        return marker;

      });
      markersByRegionRef.current[regionKey] = markers;
      clustererRef.current.addMarkers(markers);

      return markers;

    });
    return newMarkers;
  }, [createCoords, createMarker, icon, markerEventListener])

  return { createCoords, createMarker, markerEventListener, createMarkersFromData }

}