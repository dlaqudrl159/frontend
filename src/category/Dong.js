import React, { memo, useMemo } from "react";
import AddressDong from "./categoryJson/AddressDong.json";
import { DongContainer, DongFormControl, DongMenuItem, DongSelect, RegionFormControl, RegionMenuItem, RegionSelect } from "../styles/Category.Styles";

const Dong = memo(({ selectDong, setSelectedDong, selectedSido, selectedSigungu }) => {

    const dongList = useMemo(() => {

        return AddressDong[selectedSido][selectedSigungu];

    }, [selectedSido, selectedSigungu])

    return (
        <DongContainer>
            <RegionFormControl size="small">
                <RegionSelect
                    value={selectDong}
                    onChange={(e) => setSelectedDong(e.target.value)}
                >
                    {dongList.map(dong => (
                        <RegionMenuItem key={dong} value={dong}>{dong}</RegionMenuItem>
                    ))}
                </RegionSelect>
            </RegionFormControl>
        </DongContainer>
    )
})

export default Dong;