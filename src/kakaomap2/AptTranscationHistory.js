import React, { useEffect, useRef, useState , memo } from 'react';
import { json } from 'react-router-dom';
import axios from 'axios';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';


const AptTranscationHistory = memo(({ apartmentData }) => {
  console.log("AptTranscationHistory 함수부분")
  
  const [selectResponse , setSelectResponse] = useState(null);
  
  console.log(selectResponse);

  useEffect(() => {
    const fetchTransactions = async () => {
      
        try {
         const getAptTrancsactionHistory = await axios.get('/api/getAptTrancsactionHistory',{
          params : {
            apartmentname : apartmentData.apartmentname,
            bungi : apartmentData.bungi,
            sigungu : apartmentData.sigungu,
            roadname : apartmentData.roadname
          }
         }).then(response => {
            console.log(response);
            setSelectResponse(response.data);
         }).catch(error => {
            console.log(error);
         }).finally (
          
         ) 
        } catch (error) {
          
        } finally{
        }
    };

    fetchTransactions();
  }, [apartmentData]);

    return (
        <>

        {console.log("AptTranscationHistory 렌더")}
        {!selectResponse ? (<p>데이터를 불러오는중</p>) : (
          <>
          <div style={styles.container}>
          
          </div>
        </>
      )}

        </>
    )

})

const styles = {
  container : {
    backgroundColor : 'gray',
    width : '300px',
    height : '300px' 
  }
}

export default AptTranscationHistory;