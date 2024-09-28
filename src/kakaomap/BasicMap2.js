import React, {useEffect, useState} from "react";
import axios from 'axios';
import qs from "qs";
import Select2 from '../select/Select2';
import Category from '../category/Category2';
import Loading from '../modal/Loading';
import DataModal from '../modal/SidePanel';

const { kakao } = window;

const BasicMap2 = (props) => {

    const [year,setYear] = useState(new Date().getFullYear());

    const [region3 , setRegion3] = useState("소공동")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [modalShow , setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    const [selectedMarkerData, setSelectedMarkerData] = useState(null);

    const initMakers = [];
    
    const createMap = () => {

        console.log("3번실행")
       
          let mapContainer = document.getElementById('map');
          let mapOption = {
              center: new kakao.maps.LatLng(37.56435977921398, 126.97757768711558), // 지도의 중심좌표
              //draggable: false, // 지도를 생성할때 지도 이동 및 확대/축소를 막으려면 draggable: false 옵션을 추가하세요
              level: 4 // 지도의 확대 레벨
          }
          // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
          var map = new kakao.maps.Map(mapContainer, mapOption);  
            handleShow(); 
            markerinit(initMakers);
            newfunction(map);
            
          kakao.maps.event.addListener(map, 'dragend', function() {
            
            if(map.getLevel() < 5){
              handleShow(); 
              markerinit(initMakers);
              newfunction(map);
              
            }                
          });                     
    }

      const newfunction = (map) => {
        var mapBounds = map.getBounds();
        var geocoder = new kakao.maps.services.Geocoder();  
            var sWLatLng = mapBounds.getSouthWest();
            var neLatLng = mapBounds.getNorthEast();
            var sWLat =  sWLatLng.getLat();
            var sWLng = sWLatLng.getLng();
            var neLat = neLatLng.getLat();
            var neLng = neLatLng.getLng();                            
            var ss = new kakao.maps.LatLng(sWLat,sWLng);
            var sn = new kakao.maps.LatLng(sWLat,neLng);
            var ns = new kakao.maps.LatLng(neLat,sWLng);
            var nn = new kakao.maps.LatLng(neLat,neLng);
            
            var arrcoords = [map.getCenter(),ss,sn,ns,nn];                                      
                     
            var arr = [];
            var count= 0;
            var totalcount = arrcoords.length;
            var region_3depth_name = "";
        arrcoords.forEach(function(coords) {
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), function(result,status){
            var region_arr = displayCenterInfo(result,status);
           
            arr.push(region_arr[0]);

            if(count === 0){
              region_3depth_name = region_arr[3]          
            }
            
            count++;
            
            if(count === totalcount){dosometing(arr,region_3depth_name,map)}
          });      
        })

        async function dosometing(arr,region_3depth_name,map){
          await axios.get("/api/get",{params :{arr:arr,year:[year]},paramsSerializer:(params) =>{
            return qs.stringify(params,{arrayFormat:"comma"});}
          })
          .then(response => {
            setRegion3(region_3depth_name)
            //console.log(response);
            makermaking(response,map)           
            handleClose();
            
          })
          .catch(error => {
            console.log(error)
            handleClose();         
        })                        
        }  
      }
      
      const makermaking =  (response,map) => {
          
        var totalcount = response.data.length;
        var count = 0;
        var markers = [];
        
        response.data.forEach(function(data){
          //var imageSize = new kakao.maps.Size(24, 35); 
          //var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
          var coords = new kakao.maps.LatLng(data.lat, data.lng);
          var marker = new kakao.maps.Marker({
            title : data.lat + "/" + data.lng,
            position : coords,
            
          })
          kakao.maps.event.addListener(marker, 'click', clickListener(map, marker));
          
          markers.push(marker);
          count++;
          if(count === totalcount){
            for (var i = 0; i < markers.length; i ++) {
              markers[i].setMap(map);
              initMakers.push(markers[i]);
          }
          handleClose();
          };
        })
        
      }



      const clickListener = (map, marker) => {
        return async function() {
         // console.log(marker.getTitle());
         // console.log(marker);
         // console.log(marker.getPosition().getLat());
          var a = marker.getTitle().split('/');
         // console.log(a[0]);
         // console.log(a[1]);
          await axios.get('/api/latlng' , {
            params:{
              lat : a[0],
              lng : a[1]
            }
          }).then(response => {
            setSelectedMarkerData(response.data);
            handleModalShow();
            console.log(response.data);
            
          }).catch(error => {
            console.log(error)
                    
        })   
        }
      }

       const markerinit = (initMakers) => {
          for(var i = 0 ; i < initMakers.length ; i++){
            initMakers[i].setMap(null);
           }
           initMakers.length = 0;
        }
        
        const displayCenterInfo = (result,status) => {
          //console.log(result);
          if (status === kakao.maps.services.Status.OK) {              
            for(var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'H') {  
                var arr = [];
                arr[0] = result[i].address_name;
                arr[1] = result[i].region_1depth_name;
                arr[2] = result[i].region_2depth_name;
                arr[3] = result[i].region_3depth_name;
                //console.log(result[i].address_name);                                                                                             
                return arr;
              }
          }
         }else{
          //console.log(status);
         }
       } 
      useEffect(() => {
        async function getMap(callback) {await callback();}
        getMap(createMap);        
      }, [])

    return (
        <>       
        <Loading show={show}></Loading>
        <div id="name" style={styles.container}>
          <div id="map" style={styles.map}>
            <Category year={year} region3={region3} />
            
          </div>
        </div>
        <DataModal 
        show={modalShow} 
        handleClose={handleModalClose} 
        data={selectedMarkerData} 
      />
        </>
    )

}

const styles = {
  container: { width: "100%", height: "100%" },
  map: { width: "100%", height: "100%", position: "relative", zIndex: 0 },
}

export default BasicMap2;