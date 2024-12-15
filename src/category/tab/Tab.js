import React, {memo} from "react";

const Tab = memo(({id, label, isActice, onClick}) => {

    return (
        <>
        <div
            style={{
              ...styles.tab,
              ...(isActice ? styles.activeTab : {})
            }}
            onClick={() => onClick(id)}
          >
            {label}
          </div>
        </>
    )

})

const styles = {
    tab: {
        border: "1px solid black",
        width: "30%",
        height: "80%",
        backgroundColor: "#f3f5ff",
        textAlign: "center",
        lineHeight: '35px',
        color: "black",
        cursor: "pointer",
        marginLeft: "1%",
        marginRight: "1%"
      },
      activeTab: {
        backgroundColor: "lightgray",
        fontWeight: "bold",
      },
}

export default Tab;