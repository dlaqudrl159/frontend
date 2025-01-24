import React, { memo } from 'react';
import TabDropDown from "./tab/TabDropDown";
import { ApartmentNameButton, ApartmentNameContainer, ApartmentNameHeaderTitle, ApartmentNameInput } from '../styles/Category.Styles';

const ApartmentName = memo(({ apartmentname, setApartMentNmae, handleCategoryClick }) => {

    return (
        <TabDropDown>
            <ApartmentNameContainer className='apartmentnameContainer'>
            <ApartmentNameHeaderTitle>단지명 검색</ApartmentNameHeaderTitle>
            <ApartmentNameInput
                value={apartmentname}
                type="text"
                placeholder="단지명 입력"
                onChange={(e) => {
                    setApartMentNmae(e.target.value);
                }}
            />
            <ApartmentNameButton onClick={() => handleCategoryClick()}>검색</ApartmentNameButton>
            </ApartmentNameContainer>
        </TabDropDown>
    )

})

export default ApartmentName;