import React, { useRef, useCallback} from "react";

const { kakao } = window;

export const useClusterer = () => {

    const clustererRef = useRef(null);

    const createClusterer = useCallback((map) => {
      return new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
        minLevel: 4, // 클러스터 할 최소 지도 레벨 
        MinClusterSize: 10,
        calculator: [50, 100],
        gridSize: 120,
        disableClickZoom: true
      });
    }, [])

      return { clustererRef, createClusterer }
}