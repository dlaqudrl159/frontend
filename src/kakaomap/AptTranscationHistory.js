import React, { useEffect, useRef, useState } from 'react';
import { json } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


const AptTranscationHistory = ({ isOpen, onClose, apartmentData }) => {

  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [loading,setLoading] = useState(false);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      if (isOpen) {
        setLoading(true);
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
          

          setDisplayedTransactions(apartmentData);
        } catch (error) {
          
        } finally{
          setLoading(false);
        }
        
      }else{
        console.log("isOpenNot")
      }
    };

    fetchTransactions();
  }, [isOpen, apartmentData.id]);


  if (!isOpen) return null;

    return (
        <>
        {loading ? (<p>데이터를 불러오는중</p>) : (<>
          <pre>{apartmentData.apartmentname}</pre>
          <pre>{apartmentData.bungi}</pre>
          <pre>{apartmentData.sigungu}</pre>
        </>)}
        </>
    )

}

export default AptTranscationHistory;