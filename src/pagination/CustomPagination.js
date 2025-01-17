import { PaginationItem } from "@mui/material";
import React, { memo } from "react";
import {Pagination} from "@mui/material";

const CustomPagination = memo(({ curPage, setCurPage, amount, totalPage, startNum, endNum, beginPageNum, finishPageNum }) => {

    const pageNumbers = [];
    for (let i = beginPageNum; i <= finishPageNum; i++) {
        pageNumbers.push(i);
    }
    const handlePrev = () => {
        if (curPage === 1) return;
        setCurPage(curPage - 1);
    }

    const handleNext = () => {
        if (curPage === totalPage) return;
        setCurPage(curPage + 1);
    }

    return (
      <Pagination 
        page={curPage}
        count={totalPage}
        onChange={(e, page) => setCurPage(page)}
        renderItem={(item) => {
          // beginPageNum(1,6,11,16,21)부터 finishPageNum(5,10,15,20,23)까지만 표시
          if (
            item.type === 'page' && 
            (item.page < beginPageNum || item.page > finishPageNum)
          ) {
            return null;
          }
  
          // 이전 버튼
          if (item.type === 'previous') {
            return (
              <PaginationItem
                {...item}
                onClick={() => curPage > 1 && setCurPage(curPage - 1)}
                disabled={curPage === 1}
              />
            );
          }
  
          // 다음 버튼
          if (item.type === 'next') {
            return (
              <PaginationItem
                {...item}
                onClick={() => curPage < totalPage && setCurPage(curPage + 1)}
                disabled={curPage === totalPage}
              />
            );
          }
          
          return <PaginationItem {...item} />;
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& .MuiPaginationItem-root': {
            margin: '0 2px'
          }
        }}
      />
    );
})

const styles = {
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px'
    },
    pageButton: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#ddd',
        borderRadius: '4px',
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    activePageButton: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        color: 'white'
    },
    disabledButton: {
        backgroundColor: '#f5f5f5',
        borderColor: '#ddd',
        color: '#999',
        cursor: 'not-allowed'
    }
};

export default CustomPagination;