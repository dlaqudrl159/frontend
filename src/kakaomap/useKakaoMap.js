import React, { useEffect, useRef, memo, useCallback, useState } from "react";

const { kakao } = window;

export const useKakaoMap = () => {

    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const infowindowRef = useRef(null);
    const clustererRef = useRef(null);

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

    return {
        mapRef,mapInstanceRef,infowindowRef,clustererRef,makearrcoords
    };

}
