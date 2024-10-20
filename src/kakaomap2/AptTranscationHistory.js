import React, { useEffect, useRef, useState , memo } from 'react';
import { json } from 'react-router-dom';
import axios from 'axios';


const AptTranscationHistory = memo(({ apartmentData }) => {
  console.log("AptTranscationHistory 함수부분")
  const [loading,setLoading] = useState(false);
  
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
        {loading ? (<p>데이터를 불러오는중</p>) : (<>
          <pre>{apartmentData.apartmentname}</pre>
          <pre>{apartmentData.bungi}</pre>
          <pre>{apartmentData.sigungu}</pre>
        </>)}
        </>
    )

})

export default AptTranscationHistory;