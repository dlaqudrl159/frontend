import React ,{ useEffect, useState } from "react";
import axios from 'axios';
import BasicMap3 from "../kakaomap/BasicMap3";

const Main3 = (props) => {


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
             <BasicMap3/>
        
        </>
    )
}

export default Main3;