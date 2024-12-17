import React, { memo } from "react";

const TabDropDown = memo(({ children, additionalStyle = {} }) => {

    return (
        <div className="TabDropDown" style={{ ...styles.dropdown, ...additionalStyle }}>
            {children}
        </div>
    );

});

const styles = {
    dropdown: {
        width: "100%",
        height: "100%",  // 높이 약간 증가
        backgroundColor: "white",
        padding: "5px",
        //border : 'none',
        pointerEvents: 'auto' //마우스 이벤트 작동
    },
}

export default TabDropDown;