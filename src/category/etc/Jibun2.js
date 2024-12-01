import React, { memo, useState , useEffect } from "react";
import Select from "./Select";
import AddressSido from "./categoryJson/AddressSido.json";
import AddressSigungu from "../categoryJson/AddressSigungu.json";
import AddressDong from "../categoryJson/AddressDong.json";

const Jibun2 = memo(({ setSelectedSido, setSelectedSigungu, setSelectedDong }) => {

    const sidoData = AddressSido['Sido'];
    console.log(sidoData)
    const [sido , setSido] = useState(sidoData[0]);
    
    const [sigunguData , setSigunguData] = useState();
    const [sigungu , setSigungu] = useState()

    const [dongData ,setDongData] = useState();
    const [dong , setDong] = useState()

    useEffect(() => {
        setSigunguData(AddressSigungu[sido])
    }, [sido])

    useEffect(() => {
        sigunguData && setSigungu(sigunguData[0])
    }, [sigunguData])

    useEffect(() => {
        setDongData(AddressDong[sido][sigungu])
    }, [sigungu])

    useEffect(() => {
        dongData && setDong(dongData[0])
    }, [dongData])

  

  return (
    <div style={{ ...styles.dropdown, ...styles.regionDropdown }}>
      <div style={styles.selectContainer}>
        <Select data={sidoData} selected={sido} setSelected={setSido} ></Select>
        <Select data={sigunguData} selected={sigungu} setSelected={setSigungu} ></Select>
        <Select data={dongData} selected={dong} setSelected={setDong} ></Select>
      </div>
      <div style={styles.dongList}>
      </div>
    </div>
  )

})

const styles = {
  dropdown: {
    border: "1px solid black",
    width: "500px",
    position: "absolute",
    zIndex: 3,
    backgroundColor: "white",
    top: "12%",  // tabContainer의 top(7%) + height(5%)
    left: "20px",
    padding: "10px",
  },
  regionDropdown: {
    height: "150px",
    backgroundColor: "#ffffff",
  },
  selectContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  dongList: {
    maxHeight: '200px',
    overflow: 'auto',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
  },
}

export default Jibun2;