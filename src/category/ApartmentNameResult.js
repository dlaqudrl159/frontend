import React, { memo } from "react";
import { SearchPanelResult } from "../styles/Category.Styles";

const ApartmentNameResult = memo(({ item, onClick }) => {

    return (
        <SearchPanelResult
            className="apartmentnameresult"
            variant="body1"
            onClick={() => onClick(item, item.apartmentname)}
        >
            {item.apartmentname}
        </SearchPanelResult>
    )
})

export default ApartmentNameResult;