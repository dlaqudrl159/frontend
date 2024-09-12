import React, {useEffect, useState} from "react";
import Year from "./Year";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Category = (props) => {

    const year = props.year;
    const regions3 = props.region3;

    

    const [eoeoeo,setEoeoeo] = useState("");

    

    const ChangeEoEoEo = (e) => {
      
      setEoeoeo(e);
    }

    const ClickYear = (e) => {
      setEoeoeo("year");
      return <div style={{border:"1px" , width:"500px" , height : "20%" , position:"absolute" ,zIndex:3 , backgroundColor:"white", top:"11%", left:"20px"}}>year</div>;
    }
    const ClickChoice = (e) => {
      setEoeoeo("Choice");
      return <div style={{border:"1px" , width:"500px" , height : "20%" , position:"absolute" ,zIndex:3 , backgroundColor:"white", top:"11%", left:"20px"}}>Choice</div>;
    }
    const ClickRegion = (e) => {
      setEoeoeo("Region");
      return <div style={{border:"1px" , width:"500px" , height : "20%" , position:"absolute" ,zIndex:3 , backgroundColor:"white", top:"11%", left:"20px"}}>Region</div>;
    }
    const ClickApartmentname = (e) => {
      setEoeoeo("Apartmentname");
      return <div style={{border:"1px" , width:"500px" , height : "20%" , position:"absolute" ,zIndex:3 , backgroundColor:"white", top:"11%", left:"20px"}}>Apartmentname</div>;
    }
    const NullClick = () => {
      return <div></div>;
    }

    const OnClick = (e) => {
     
    
    }
    
        return (
        <>
        
        <div id="name" style={{width:"100%", height:"100%"}}>
          <div id="map" style={{width: "100%", height: "100%",position:"relative",zIndex:0}}> 
            <div style={{width:"500px", height:"5%", backgroundColor:"white"/*  opacity:0.7*/,position:"absolute",zIndex:3,top:"5%",left:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
             <div id ="year" style={{border:"1px", width:"22%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black",marginLeft:"5px"}} onClick={ClickYear}>{year}</div>
             <div id ="choice" style={{border:"1px", width:"22%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black"}} onClick={ClickChoice}>지번주소</div>
             <div id ="region" style={{border:"1px", width:"22%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black"}} onClick={ClickRegion}>{regions3}</div> 
             <div id ="apartmentname" style={{border:"1px", width:"22%", height:"80%", backgroundColor:"gray",textAlign:"center",lineHeight:'35px',color:"black"}} onClick={ClickApartmentname}>단지명</div> 
             <div id ="search" style={{height:"80%", textAlign:"center",lineHeight:'35px', marginRight:"5px"}}><FontAwesomeIcon icon={faSearch} size="lg" /></div>
            </div>    
            <div>
              {
                eoeoeo === "year" ? <ClickYear/> : eoeoeo === "Choice" ? <ClickChoice/> : eoeoeo === "Region" ? <ClickRegion/> : eoeoeo === "Apartmentname" ? <ClickApartmentname/> : <NullClick/>
              }
            </div>
          </div>
        </div>

        </>
    )

}

export default Category;