import React, { memo } from "react";

const DropDown = memo(({ children, additionalStyle = {} }) => {

    return (
        <div style={{ ...styles.dropdown, ...additionalStyle }}>
            {children}
        </div>
    );

});

const styles = {
    dropdown: {
        border: "1px solid black",
        width: "100%",
        height: "150px",  // 높이 약간 증가
        backgroundColor: "white",
        padding: "10px",
        //border : 'none',
        pointerEvents: 'auto' //마우스 이벤트 작동
    },
}

export default DropDown;