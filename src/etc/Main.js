import React ,{ useEffect, useState } from "react";
import axios from 'axios';
import Select from '../select/Select';
import Button from 'react-bootstrap/Button';
import BasicMap from '../kakaomap/BasicMap';
const Main = () => {
    
    const [pageNo, setPageNo] = useState("1");

    const [LAWD_CD, setLAWD_CD] = useState("0");

    const [DEAL_YMD, setDEAL_YMD] = useState("201510");

    const [data, setData] = useState([]);
    
    /*useEffect(() => {
        axios.get('/api/get?pageNo=' + pageNo + '&' + 'LAWD_CD=' + LAWD_CD + '&' + 'DEAL_YMD=' + DEAL_YMD)
        .then(response => 
            {         
            
            setData(response.data.list)
        })
        .catch(error => console.log(error))
    }, [/*pageNo,,DEAL_YMD*//*LAWD_CD]);*/
    const OnClick = () => {
        console.log(LAWD_CD);
        
        axios.get('/api/get?pageNo=' + pageNo + '&' + 'LAWD_CD=' + LAWD_CD + '&' + 'DEAL_YMD=' + DEAL_YMD)
        
        .then(response => 
            {
            var data3 = [];
            console.log(response.data);    
            const count = Object.keys(response.data.list).length;

            for(var i = 0 ; i < count ; i++){
                data3.push(response.data.list[i]);
            }
            setData(data3);
            
            
            
        })
        .catch(error => console.log(error))
    }

    return (
        <>  
            <div>
            <Select propsfunction={setLAWD_CD}></Select>
            <p></p>
            <Button onClick={OnClick}>조회</Button>
            </div>
            
            <BasicMap propelement={LAWD_CD}/> 
           
            {data.map((dto, idx) => {
               
                return (
                    <div key={idx}>
                       
                    <span>{dto.dealAmount}</span>
                    <span>/////////////</span>
                    <span>{dto.buildYear}</span>
                        
                    </div>
                )
                
            })}
           
        </>
    )

}

export default Main;