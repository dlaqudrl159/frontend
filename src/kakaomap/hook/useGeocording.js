import { useCallback } from "react";

const { kakao } = window;

export const useGeocording = () => {

    const displayCenterInfo = useCallback((result, status) => {

        if (!kakao || !kakao.maps || !kakao.maps.services) return null;

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

      const getRegionCode = useCallback((coords) => {
        return new Promise((resolve) => {

// kakao가 로드되지 않았을 경우를 대비
      if (!kakao || !kakao.maps || !kakao.maps.services) {
        console.warn("카카오 지도 SDK가 로드되지 않았습니다.");
        resolve(null);
        return;
      }

      // Geocoder를 사용할 때마다 생성하거나, 함수 내부에서 생성합니다.
      const geocoder = new kakao.maps.services.Geocoder();

          geocoder.coord2RegionCode(
            coords.getLng(),
            coords.getLat(),
            (result, status) => {
              const regionArr = displayCenterInfo(result, status);
              resolve(regionArr);
            }
          );
        });
      }, [displayCenterInfo]);

    return { displayCenterInfo, getRegionCode }

}