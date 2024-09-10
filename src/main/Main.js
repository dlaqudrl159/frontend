import React ,{ useEffect, useState } from "react";
import axios from 'axios';
import BasicMap from "../kakaomap/BasicMap2";

const Main = (props) => {


    useEffect(() => {
        console.log("4번실행")
        /*async function getData() {
            await axios.get('/api/get')
            .then(response => 
                {     
                console.log(response);
            })
            .catch(error => console.log(error))
        }
         getData();*/
    }, [test]);


    return(
        <>
             {console.log("1번실행")}
             <BasicMap/>
             
        
        </>
    )
}

export default Main
;