import React, {useEffect, useState} from "react";
import axios from 'axios';
import qs from "qs";
import Select2 from '../select/Select2';

const { kakao } = window;

const BasicMap3 = (props) => {

    const [year,setYear] = useState('2023');

    const[region3 , setRegion3] = useState("소공동")

    const createMap = () => {

        console.log("3번실행")
       
          let mapContainer = document.getElementById('map');
          let mapOption = {
              center: new kakao.maps.LatLng(37.56435977921398, 126.97757768711558), // 지도의 중심좌표
              //draggable: false, // 지도를 생성할때 지도 이동 및 확대/축소를 막으려면 draggable: false 옵션을 추가하세요
              level: 3 // 지도의 확대 레벨
          }
          // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
          var map = new kakao.maps.Map(mapContainer, mapOption);  
        
            newfunction(map);

          kakao.maps.event.addListener(map, 'idle', function() {
            
            if(map.getLevel() < 4){          
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

            if(count === 0){region_3depth_name = region_arr[3]
              console.log(region_arr);
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
            console.log(response);
            makermaking(response,map);
            
          })
          .catch(error => console.log(error))                       
        }  
      }
        const makermaking = (response,map) => {
          
          var geocoder = new kakao.maps.services.Geocoder();
          var totalcount = response.data.length;
          var count = 0;
          var arr = [];
          response.data.forEach(function(data){
              
              var address = data.sigungu + " " + data.bungi;
              
              geocoder.addressSearch(address, function(result,status){
                if (status === kakao.maps.services.Status.OK) {
                  var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                  var maker = {title : data.apartmentname,
                               position : coords
                  }
                  arr.push(maker);
                  count++;
                  if(count === totalcount){
                    
                      makemaker(arr,map);
                   
                    
                  };
                }else{
                  console.log(result);
                  console.log(status);
                }
              })

          })

        }
         const makemaker = (arr,map) => {
              
          for (var i = 0; i < arr.length; i ++) {
                                       
              var marker = new kakao.maps.Marker({
                  map: map, // 마커를 표시할 지도
                  position: arr[i].position, // 마커를 표시할 위치
                  title : arr[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                  
              });
          }
        }
        const displayCenterInfo = (result,status) => {
        
          if (status === kakao.maps.services.Status.OK) {              
            for(var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'H') {  
                var arr = [];
                arr[0] = result[i].address_name;
                arr[1] = result[i].region_1depth_name;
                arr[2] = result[i].region_2depth_name;
                arr[3] = result[i].region_3depth_name;                                                                                             
                return arr;
              }
          }
         }
       } 
      useEffect(() => {
        async function getMap(callback) {await callback();}
        getMap(createMap);        
      }, [])

    return (
        <>       
        {console.log("2번실행")}
        <div id="name" style={{width:"100%", height:"100%"}}>
          <div id="map" style={{width: "100%", height: "100%",position:"relative",zIndex:0}}> 
            <div style={{width:"500px", height:"5%", backgroundColor:"white"/*  opacity:0.7*/,position:"absolute",zIndex:3,top:"5%",left:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}> 
            <div style={{border:"1px", width:"23%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black",marginLeft:"5px"}}>{year}</div>
            <div style={{border:"1px", width:"23%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black"}}>지번주소</div>
            <div style={{border:"1px", width:"23%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black"}}>{region3}</div> 
            <div style={{border:"1px", width:"23%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black",marginRight:"5px"}}>단지명</div> 
            </div>    
          </div>
        </div>
        
        </>
    )

}
export default BasicMap3;