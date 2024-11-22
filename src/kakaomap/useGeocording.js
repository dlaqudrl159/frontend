import React, { useCallback } from "react";

const { kakao } = window;

export const useGeocording = () => {

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

    return { displayCenterInfo }

}