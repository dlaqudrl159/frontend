import React, {useEffect, useState} from "react";
import Year from "./Year";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Category = (props) => {

    const year = props.year;
    const regions3 = props.region3;

    const OnClick = (e) => {
     
    }

    return (
        <>
        
        <div id="name" style={{width:"100%", height:"100%"}}>
          <div id="map" style={{width: "100%", height: "100%",position:"relative",zIndex:0}}> 
            <div style={{width:"500px", height:"5%", backgroundColor:"white"/*  opacity:0.7*/,position:"absolute",zIndex:3,top:"5%",left:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
             <div id="year"  style={{border:"1px", width:"22%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black",marginLeft:"5px"}} onClick={OnClick}>{year}</div>
             <div id ="choice" style={{border:"1px", width:"22%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black"}} onClick={OnClick}>지번주소</div>
             <div id = "region" style={{border:"1px", width:"22%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black"}} onClick={OnClick}>{regions3}</div> 
             <div id="apartmentname" style={{border:"1px", width:"22%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black"}} onClick={OnClick}>단지명</div> 
            < div style={{height:"80%", textAlign:"center",lineHeight:'35px', marginRight:"5px"}}><FontAwesomeIcon icon="fas fa-search" size="lg" /></div>
            </div>    
            <div style={{border:"1px" , width:"500px" , height : "20%" , position:"absolute" ,zIndex:3 , backgroundColor:"white", top:"11%", left:"20px"}}>
              
            </div>
          </div>
        </div>

        </>
    )

}

export default Category;