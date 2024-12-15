import React, {memo} from "react";

const TabContainer = memo(({ children }) => {

    return (
        <div style={styles.tabContainer}>
            {children}
        </div>
    );

});

const styles = {
    tabContainer: {
        width: "100%",
        height: "5%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pointerEvents: 'auto'
      },
}

export default TabContainer;