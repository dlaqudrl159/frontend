import React, { memo } from "react";
import { SearchPanelResult } from "../styles/Category.Styles";

const RoadNameResult = memo(({ item, onClick }) => {

    return (
        <SearchPanelResult
            className="roadnameresult"
            variant="body1"
            onClick={() => onClick(item.roadname)}
        >
            {item.roadname}
        </SearchPanelResult>
    )

})

export default RoadNameResult;