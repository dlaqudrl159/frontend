import React, {useRef, useCallback} from "react";

const { kakao } = window;

export const useInfoWindow = () => {

    const infowindowRef = useRef(null);

    const createInfoWindow = useCallback((content) => {

        const infowindow = new kakao.maps.InfoWindow({
            content: content,
            removable: true
          });
        return infowindow;
    }, [])

    const createContent = useCallback((items) => {
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
          return content;
    }, [])

    const showInfoWindow = useCallback(((marker, items, map , getMarkerData) => {
        // 기존 InfoWindow가 있다면 닫기
        if (infowindowRef.current) {
          infowindowRef.current.close();
        }
        const content = createContent(items);
        const infowindow = createInfoWindow(content);
        // 전역 함수로 등록
        window.selectApartment = function (apartmentname) {
          getMarkerData(marker, apartmentname)();
          infowindowRef.current.close();
        };
    
        infowindow.open(map, marker);
        infowindowRef.current = infowindow;
      }), [createContent, createInfoWindow]);

    return { showInfoWindow }

}