import React, { memo } from "react";
import { TabDropDownBox } from "../../styles/Category.Styles";

const TabDropDown = memo(({ children}) => {

    return (
        <TabDropDownBox className="tabDropDownBox">
            {children}
        </TabDropDownBox>
    );

});

export default TabDropDown;