import React ,{ useEffect, useState } from "react";
import axios from 'axios';
import Select from '../select/Select';
import Button from 'react-bootstrap/Button';
import BasicMap from '../kakaomap/BasicMap2';
const Main2 = () => {
    
    const [pageNo, setPageNo] = useState("1");

    const [LAWD_CD, setLAWD_CD] = useState("11140");

    const [DEAL_YMD, setDEAL_YMD] = useState("201510");

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("4번실행")
        async function getData() {
            await axios.get('/api/get?pageNo=' + pageNo + '&' + 'LAWD_CD=' + LAWD_CD + '&' + 'DEAL_YMD=' + DEAL_YMD)
            .then(response => 
                {     
                setData(response.data.list)
            })
            .catch(error => console.log(error))
        }
         getData();
    }, [DEAL_YMD,LAWD_CD]);
    

    return (
        <>  
            {console.log("1번실행")}
            <p></p>
            
            {data.length > 0 ? <BasicMap setLAWD_CD={setLAWD_CD} data={data}/> : <p>로딩중</p>} 
            
            
           
        </>
    )

}

export default Main2;