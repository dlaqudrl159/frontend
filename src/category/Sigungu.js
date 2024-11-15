import React, { memo, useMemo } from "react";
import AddressSigungu from "./categoryJson/AddressSigungu.json";
import AddressDong from "./categoryJson/AddressDong.json";
const Sigungu = memo(({ selectedSido, selectedSigungu, setSelectedSigungu, setSelectedDong}) => {

  const sigunguList = useMemo(() => {
    return selectedSido ? AddressSigungu[selectedSido] || [] : [];
  }, [selectedSido]);

  return (
    <select
      value={selectedSigungu}
      onChange={(e) => 
        {setSelectedSigungu(e.target.value)
          var Dong = AddressDong[selectedSido][e.target.value][0];
          setSelectedDong(Dong);
        }}
      style={styles.select}
    >
      {sigunguList.map(sigungu => (
        <option key={sigungu} value={sigungu}>{sigungu}</option>
      ))}
    </select>
  )

})

const styles = {
  select: {
    flex: 1,
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  }
}
export default Sigungu;