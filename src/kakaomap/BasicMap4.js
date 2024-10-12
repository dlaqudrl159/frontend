import React, {useEffect, useState} from "react";
import axios from 'axios';
import qs from "qs";
import Category from '../category/Category4';
import Loading from '../modal/Loading4';
import SideModal2 from '../modal/SidePanel2';

const { kakao } = window;

const geocoder = new kakao.maps.services.Geocoder(); 

const BasicMap4 = (props) => {

    const [map, setMap] = useState();

    const [mapBounds , setMapBounds] = useState();

    const [categoryRegion, setCategoryRegion] = useState();

    const [categoryYear ,setcategoryYear] = useState(new Date().getFullYear());

    const [markerArr, setMarkerArr] = useState([]);

    const [loadingModalShow, setLoadingModalShow] = useState(false);
    const loadingModalShowOpen = () => setLoadingModalShow(true);
    const loadingModalShowClose = () => setLoadingModalShow(false);

    const createMap = () => {
          console.log("createMap 실행")
          if(map != null) return;
          console.log("맵 생성중");
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
        if(map == null) {createMap();}
        console.log("map useState에 상태변경중")
        if(map != null){
        console.log("map 상태변경 완료");
          setMapBounds(null);  
          setMapBounds(map.getBounds());
        kakao.maps.event.addListener(map, 'dragend', function() {
          if(map.getLevel() < 5){
            loadingModalShowOpen();
            setMapBounds(null);  
            setMapBounds(map.getBounds());
          }
        }); 
        }
      },[map])

      useEffect(() => {
        
        if(markerArr != null) {
          markerArr.forEach((marker) => marker.setMap(map));
        }

      },[markerArr])

      //지도가 서해 북해 북한 이런식으로 가면 ""빈칸이 들어가서 문제생김 displayinfo쪽에서 처리해야 할듯 
      useEffect(() => {
        if(mapBounds != null/* && map.getLevel() < 5*/) {
          var addressnameArr = [];
          var count= 0;
          const totalcount = 5;
          
          markerArr.forEach((marker) => marker.setMap(null));
          makearrcoords(mapBounds).forEach(coords => {
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), function(result,status) {
              var regionArr = displayCenterInfo(result,status);
              addressnameArr.push(regionArr.addressname);
              if(count == 0) {
                setCategoryRegion(regionArr.region_3depth_name);
              }
              count++;

              if(count === totalcount){get(addressnameArr)}
            })
          })
        }
      },[mapBounds]);

      async function get(addressnameArr){
        await axios.get("/api/get2",{params :{addressnameArr:addressnameArr},paramsSerializer:(params) =>{
          return qs.stringify(params,{arrayFormat:"comma"});}
        })
        .then(response => {
          makermaking(response);
          console.log("::::::::::")
          loadingModalShowClose();
        })
        .catch(error => {
      })                        
      }  

      const makermaking =  (NameCountDtoList) => {
          
        var totalcount = NameCountDtoList.data.length;
        var count = 0;
        var markers = [];
        
        NameCountDtoList.data.forEach((NameCountDto) => {
          var coords = new kakao.maps.LatLng(NameCountDto.lat, NameCountDto.lng);
          var marker = new kakao.maps.Marker({
            title : NameCountDto.lat + "/" + NameCountDto.lng,
            position : coords,
          })
            markers.push(marker);
            count++;
          if(count === totalcount){setMarkerArr(markers)};
        })
      }

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
        if (status === kakao.maps.services.Status.OK) {              
          for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {  
              //console.log(result[i]);
              var arr = {
                addressname : result[i].address_name,
                region_1depth_name : result[i].region_1depth_name,
                region_2depth_name : result[i].region_2depth_name,
                region_3depth_name : result[i].region_3depth_name

              };
              return arr;
            }
        }
       }else{
        console.log(status);
       }
     } 

    return (
        <>
          <Loading loadingModalShow={loadingModalShow}/>      
          <div id="map" style={styles.map}>
          {map && categoryRegion && <Category categoryYear={categoryYear} categoryRegion={categoryRegion}/>}
          </div>
      
        </>
    )

}

const styles = {
  map: { width: "100%", height: "100%", position: "relative", zIndex: 0 },
}

export default BasicMap4;