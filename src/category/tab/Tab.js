import React, { memo } from "react";
import { TabBox } from "../../styles/Category.Styles";

const Tab = memo(({ id, label, isActive, onClick }) => {

  return (
    <>
      <TabBox
        isactive={isActive === true}
        onClick={() => onClick(id)}
      >
        {label}
      </TabBox>
    </>
  )

})

export default Tab;