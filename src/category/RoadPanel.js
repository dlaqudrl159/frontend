import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import React, { memo } from "react";
import { usePagination } from "../pagination/usePagination";
import Pagination from "../pagination/Pagination";
import { TextField } from "@mui/material";

const RoadPanel = memo(({ roadNames, setRoadNames }) => {

  const rRoadNames = roadNames.aptCoordsDto || [];

  const { curPage, setCurPage, amount, totalPage, startNum, endNum, beginPageNum, finishPageNum } = usePagination(rRoadNames);

  console.log(curPage)
  console.log(amount)
  console.log(totalPage)
  console.log(startNum)
  console.log(endNum)
  console.log(beginPageNum)
  console.log(finishPageNum)
  const currentItems = rRoadNames.slice(startNum - 1, endNum);
  console.log(currentItems);
  return (
    <div className="RoadPanel" style={styles.roadPanel}>
      <div className="RoadPanelHeader" style={styles.header}>
      <TextField id="standard-basic" label="검색 결과" variant="standard" />
        <button onClick={() => { setRoadNames(null) }} style={styles.closeButton}>X</button>
      </div>
      <div className="RoadPanelContent" style={styles.content}>
        {currentItems.map((item, index) => (
          <div key={index}>
            <TextField
            sx={{ height: '5%', width: '100%', textAlign: 'center', fontSize: 10  }}
          id="outlined-read-only-input"
          defaultValue={item.roadname}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
          </div>
        ))}
      </div>
      <div style={styles.paginationWrapper}>
      <Pagination curPage={curPage}
        setCurPage={setCurPage}
        beginPageNum={beginPageNum}
        finishPageNum={finishPageNum}
        totalPage={totalPage}></Pagination>
        </div>
    </div>
  )

});

const styles = {
  roadPanel: {
    width: '500px',
    height: '75%',
    backgroundColor: 'white',
    pointerEvents: 'auto' //마우스 이벤트 작동
  },
  header: {
    display: 'flex',
    justifyContent: "space-between",
    height: '10%'
  },
  content: {
    height: '75%'
  },
  searchResult: {
    fontSize: '24px',
    padding: '5px'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '5px',
  },
  paginationWrapper: {
    height: '15%',
    padding: '10px',
    backgroundColor: 'white'
  },
}

export default RoadPanel;