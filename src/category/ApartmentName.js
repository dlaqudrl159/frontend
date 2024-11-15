import React, { memo } from 'react';

const ApartmentName = memo(({ apartmentname, setApartMentNmae, handleCategoryClick }) => {

    return (
        <div style={{ ...styles.dropdown, ...styles.apartmentDropdown }}>
            <h3>단지명 검색</h3>
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
        </div>
    )

})

const styles = {

    dropdown: {
        border: "1px solid black",
        width: "500px",
        position: "absolute",
        zIndex: 3,
        backgroundColor: "white",
        top: "12%",  // tabContainer의 top(7%) + height(5%)
        left: "20px",
        padding: "10px",
    },
    apartmentDropdown: {
        height: "150px",
        backgroundColor: "#ffffff",
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