import React, {useEffect, useState} from "react";
import axios from 'axios';
import qs from "qs";
import Category from '../category/Category2';
import Loading from '../modal/Loading';
import SideModal2 from '../modal/SidePanel2';

const { kakao } = window;

const geocoder = new kakao.maps.services.Geocoder(); 

const BasicMap4 = (props) => {

    const [map, setMap] = useState();

    const [mapBounds , setMapBounds] = useState();


    const createMap = () => {
          if(map != null) return;
          let mapContainer = document.getElementById('map');
          let mapOption = {
              center: new kakao.maps.LatLng(37.56435977921398, 126.97757768711558), // 지도의 중심좌표
              //draggable: false, // 지도를 생성할때 지도 이동 및 확대/축소를 막으려면 draggable: false 옵션을 추가하세요
              level: 4 // 지도의 확대 레벨
          }
          // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
          var kakaomap = new kakao.maps.Map(mapContainer, mapOption);  
          setMap(kakaomap);  

          

    }

      useEffect(() => {
        function getMap(callback) {callback();}
        getMap(createMap);        
      }, [])

      useEffect(() => {
        console.log("map useState에 상태변경중")
        if(map != null){
        console.log("map 상태변경 완료");
          setMapBounds(null);  
          setMapBounds(map.getBounds());
        kakao.maps.event.addListener(map, 'dragend', function() {
          setMapBounds(null);  
          setMapBounds(map.getBounds());
        }); 
        }
      },[map])
      
      useEffect(() => {
        if(mapBounds != null){

          makearrcoords(mapBounds).forEach(coords => {
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), function(result,status) {
              var region_arr = displayCenterInfo(result,status);
            })
          })

        }
      },[mapBounds]);

      const makearrcoords = (mapBounds) => {
        var sWLatLng = mapBounds.getSouthWest();
          var neLatLng = mapBounds.getNorthEast();
          var sWLat = sWLatLng.getLat();
          var sWLng = sWLatLng.getLng();
          var neLat = neLatLng.getLat();
          var neLng = neLatLng.getLng();     
          var ss = new kakao.maps.LatLng(sWLat,sWLng);
          var sn = new kakao.maps.LatLng(sWLat,neLng);
          var ns = new kakao.maps.LatLng(neLat,sWLng);
          var nn = new kakao.maps.LatLng(neLat,neLng);

          var arrcoords = [map.getCenter(),ss,sn,ns,nn]; 

          return arrcoords;
      }

      const displayCenterInfo = (result,status) => {
        console.log(result);
        if (status === kakao.maps.services.Status.OK) {              
          for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {  
              var arr = [];
              arr[0] = result[i].address_name;
              arr[1] = result[i].region_1depth_name;
              arr[2] = result[i].region_2depth_name;
              arr[3] = result[i].region_3depth_name;
              console.log(result[i].address_name);                                                                                             
              return arr;
            }
        }
       }else{
        console.log(status);
       }
     } 

    return (
        <>       
          <div id="map" style={styles.map}>
            
          </div>
      
        </>
    )

}

const styles = {
  map: { width: "100%", height: "100%", position: "relative", zIndex: 0 },
}

export default BasicMap4;