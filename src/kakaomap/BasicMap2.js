import React, {useEffect, useState} from "react";

const { kakao } = window;

const BasicMap2 = (props) => {

  const createMap = () => {

    console.log("3번실행")
      
      let mapContainer = document.getElementById('map');
      let mapOption = {
          center: new kakao.maps.LatLng(37.564039, 126.975664), // 지도의 중심좌표
          //draggable: false, // 지도를 생성할때 지도 이동 및 확대/축소를 막으려면 draggable: false 옵션을 추가하세요
          level: 3 // 지도의 확대 레벨
      }
      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);  
  
      var geocoder = new kakao.maps.services.Geocoder();
        
      kakao.maps.event.addListener(map, 'idle', function() {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        
      });
  
      function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    }  
  }

  useEffect(() => {
    async function getMap(callback) {
        await callback();
    }
    getMap(createMap);
  }, [])
    
  function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        
        for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                let code = result[i].code.substr(0,5); 
                console.log(code);
                props.setLAWD_CD(code); 
                break;
            }
        }
    }    
}
   
    return (
      <>
        {console.log("2번실행")}
        <div id="name" style={{width:"100%", height:"100%"}}>
          <div id="map" style={{width: "100%", height: "100%",position:"relative",zIndex:0}}> 
            <div style={{width:"500px", height:"10%", backgroundColor:"black",opacity:0.7,position:"absolute",zIndex:3,top:"5%",left:"20px"}}>
              
            </div>    
          </div>
        </div>
      </>
    )
      
    
}
export default BasicMap2;