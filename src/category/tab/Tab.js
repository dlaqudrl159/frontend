import React, { memo } from "react";
import { TabButton } from "../../styles/Category.Styles";

const Tab = memo(({ id, label, isActive, onClick }) => {

  return (
    <>
      <TabButton
        isactive={isActive === true}
        onClick={() => onClick(id)}
      >
        {label}
      </TabButton>
    </>
  )

})

export default Tab;