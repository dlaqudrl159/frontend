import React, { memo } from "react";

const Select = memo(({ data, selected, setSelected }) => {

  return (
    <>
      {selected && <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value)
        }}
      >
        {data.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>}


    </>
  )

});

export default Select