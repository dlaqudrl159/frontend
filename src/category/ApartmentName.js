import React, { memo } from 'react';
import TabDropDown from "./tab/TabDropDown";

const ApartmentName = memo(({ apartmentname, setApartMentNmae, handleCategoryClick }) => {

    return (
        <TabDropDown>
            <h3 style={styles.apartmentSearch}>단지명 검색</h3>
            <input
                value={apartmentname}
                type="text"
                placeholder="단지명 입력"
                style={styles.apartmentinput}
                onChange={(e) => {
                    setApartMentNmae(e.target.value);
                }}
            />
            <button style={styles.button} onClick={handleCategoryClick}>검색</button>
        </TabDropDown>
    )

})

const styles = {
    apartmentSearch: {
        width: '100%',
        height: '30%',
        fontSize: '30px'
    },
    apartmentinput: {
        width: '80%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        border: '1px solid #ccc',
        marginLeft: '5px',
        width: "10%",
        height: "30%"
    },
}

export default ApartmentName;