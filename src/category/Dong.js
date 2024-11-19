import React, { memo, useMemo } from "react";
import AddressDong from "./categoryJson/AddressDong.json";

const Dong = memo(({ selectDong, setSelectedDong, selectedSido, selectedSigungu }) => {

    const dongList = useMemo(() => {

        return AddressDong[selectedSido][selectedSigungu];

    }, [selectedSido, selectedSigungu])

    return (
        <select
            value={selectDong}
            onChange={(e) => setSelectedDong(e.target.value)}
            style={styles.select}
        >
            {dongList.map(dong => (
                <option key={dong} value={dong}>{dong}</option>
            ))}
        </select>
    )
})

const styles = {
    select: {
        width: "100%",
        flex: 1,
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
}

export default Dong;