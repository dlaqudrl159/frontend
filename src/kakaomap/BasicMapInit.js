import React, {useCallback, useEffect, useState, useRef} from "react";
import axios from 'axios';
import qs from "qs";
import Category from '../category/Category2';
import Loading from '../modal/Loading';
import SideModal from '../modal/SidePanel';

const { kakao } = window;

const geocoder = new kakao.maps.services.Geocoder();

const BasicMap = (props) => {



    console.log("BasicMap실행")

    useEffect(() => {
          console.log("맵 생성 시작");
          let mapContainer = document.getElementById('map');
          let mapOption = {
              center: new kakao.maps.LatLng(37.56435977921398, 126.97757768711558), // 지도의 중심좌표
              //draggable: false, // 지도를 생성할때 지도 이동 및 확대/축소를 막으려면 draggable: false 옵션을 추가하세요
              level: 4 // 지도의 확대 레벨
          }
          // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
          var map = new kakao.maps.Map(mapContainer, mapOption)

          kakao.maps.event.addListener(map, 'dragend', function() {
          });

          console.log("맵 생성중");
    },[])
    return (
        <>       
          {console.log("BasicMap렌더")}
          <div id="map" style={styles.map}>
            <Category/>
          </div>
        </>
    )

}

const styles = {
  container: { width: "100%", height: "100%" },
  map: { width: "100%", height: "100%", position: "relative", zIndex: 0 },
}

export default BasicMap;