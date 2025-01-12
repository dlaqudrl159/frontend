import React, { memo, useMemo } from "react";
import AddressSigungu from "./categoryJson/AddressSigungu.json";
import AddressDong from "./categoryJson/AddressDong.json";
import { RegionFormControl, RegionMenuItem, RegionSelect, SigunguContainer, SigunguFormControl, SigunguMenuItem, SigunguSelect } from "../styles/Category.Styles";

const Sigungu = memo(({ selectedSido, selectedSigungu, setSelectedSigungu, setSelectedDong }) => {

  const sigunguList = useMemo(() => {
    return selectedSido ? AddressSigungu[selectedSido] || [] : [];
  }, [selectedSido]);

  return (
    <SigunguContainer>
      <RegionFormControl size="small">
        <RegionSelect
          value={selectedSigungu}
          onChange={(e) => {
            setSelectedSigungu(e.target.value)
            var Dong = AddressDong[selectedSido][e.target.value][0];
            setSelectedDong(Dong);
          }}
        >
          {sigunguList.map(sigungu => (
            <RegionMenuItem key={sigungu} value={sigungu}>{sigungu}</RegionMenuItem>
          ))}
        </RegionSelect>
      </RegionFormControl>
    </SigunguContainer>
  )

})

export default Sigungu;