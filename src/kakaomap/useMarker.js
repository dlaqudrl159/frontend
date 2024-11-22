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

  const createMarkersFromData = useCallback((data, showInfoWindow, getMarkerData, map ) => {
    const groupedData = data.reduce((acc, item) => {
      const key = `${item.lat},${item.lng}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    const newMarkers = Object.entries(groupedData).map(([coordKey, items]) => {
      const [lat, lng] = coordKey.split(',');
      const coords = createCoords(lat, lng);
      let marker;
      let title = items.length > 1 ? `${items[0].apartmentname} 외 ${items.length - 1}곳` : items[0].apartmentname;
      let sigungu = items[0].sigungu;
      let bungi = items[0].bungi;
      marker = createMarker(title, coords, icon, lat, lng, sigungu, bungi);
      markerEventListener(marker, () =>
        items.length > 1 ? showInfoWindow(marker, items, map, getMarkerData)
          :
          getMarkerData(marker, marker.getTitle())());

      return marker;
    });
    return newMarkers;
  }, [createCoords, createMarker, icon, markerEventListener])

  return { createCoords, createMarker, markerEventListener, createMarkersFromData }

}