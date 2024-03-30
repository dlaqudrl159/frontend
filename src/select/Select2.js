import React ,{ useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

const Select2 = (props) => {

    const Onchange = (e) => {
        const value = e.target.value;		
        props.setSelectindex(value);
		props.setLAWD(value);
		props.setInitoption(value);
		          
    }

    return (

        <>
            <Form.Select size="lg" aria-label="Default select example" onChange={Onchange}>
				<option value="0">지역을 선택하세요</option>
	   			<option value="1">서울특별시</option>
    			<option value="2">부산광역시</option>
    			<option value="3">대구광역시</option>
    			<option value="4">인천광역시</option>
    			<option value="5">광주광역시</option>
    			<option value="6">대전광역시</option>
    			<option value="7">울산광역시</option>
    			<option value="8">세종특별자치시</option>
    			<option value="9">경기도</option>
    			<option value="10">강원도</option>
    			<option value="11">충청북도</option>
    			<option value="12">충청남도</option>
    			<option value="13">전라북도</option>
    			<option value="14">전라남도</option>
    			<option value="15">경상북도</option>
    			<option value="16">경상남도</option>
    			<option value="17">제주특별자치도</option>
        </Form.Select>
        </>

    )
}

export default Select2;