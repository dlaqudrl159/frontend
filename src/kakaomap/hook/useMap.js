export const useMap = () => {

    const { kakao } = window;
    const mapLevel = 4;
    const mapCenterLat = 37.56435977921398
    const mapCenterLng = 126.97757768711558

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

    return { initializeMap, addDragEventMap, addZoomChangeEventMap, dragEventMap, ZoomChangeEventMap }

}