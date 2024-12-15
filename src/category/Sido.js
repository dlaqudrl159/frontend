import React, { memo } from "react";
import AddressSigungu from "./categoryJson/AddressSigungu.json";
import AddressDong from "./categoryJson/AddressDong.json";

const Sido = memo(({ selectedSido, setSelectedSido, setSelectedSigungu, setSelectedDong }) => {
    return (
        <select
            value={selectedSido}
            onChange={(e) => {
                setSelectedSido(e.target.value)
                var Sigungu = AddressSigungu[e.target.value][0];
                setSelectedSigungu(Sigungu);
                var Dong = AddressDong[e.target.value][Sigungu][0];
                setSelectedDong(Dong);
            }}
            style={styles.select}
        >
            <option value="서울특별시">서울특별시</option>
            <option value="부산광역시">부산광역시</option>
            <option value="대구광역시">대구광역시</option>
            <option value="인천광역시">인천광역시</option>
            <option value="광주광역시">광주광역시</option>
            <option value="대전광역시">대전광역시</option>
            <option value="울산광역시">울산광역시</option>
            <option value="세종특별자치시">세종특별자치시</option>
            <option value="경기도">경기도</option>
            <option value="강원특별자치도">강원특별자치도</option>
            <option value="충청북도">충청북도</option>
            <option value="충청남도">충청남도</option>
            <option value="전북특별자치도">전북특별자치도</option>
            <option value="전라남도">전라남도</option>
            <option value="경상북도">경상북도</option>
            <option value="경상남도">경상남도</option>
            <option value="제주특별자치도">제주특별자치도</option>
        </select>
    )
})

const styles = {
    select: {
        flex: 1,
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    }
}

export default Sido;