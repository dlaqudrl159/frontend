import React ,{ useEffect, useState } from "react";
import axios from 'axios';
import BasicMap3 from "../kakaomap/BasicMap3";

const Main3 = (props) => {

    const [test,setTest] = useState(0);
    const [test2,setTest2] = useState(0);
    const [test3,setTest3] = useState(0);
    const [test4,setTest4] = useState(0);
    const [test5,setTest5] = useState(0);
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
             <BasicMap3 test={setTest}test2={setTest2}test3={setTest3}test4={setTest4}test5={setTest5}/>
        
        </>
    )
}

export default Main3;