import React, { memo } from "react";
import { PaginationContainer, PaginagionButton } from "../styles/Pagination.Styles";

const Pagination = memo(({ curPage, setCurPage, amount, totalPage, startNum, endNum, beginPageNum, finishPageNum }) => {

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
    console.log(totalPage);
    return (
        <PaginationContainer className="paginationcontainer">

            <PaginagionButton
                onClick={handlePrev}
                isdisabled={curPage === 1}
            >
                이전
            </PaginagionButton>


            {pageNumbers.map(num => (
                <PaginagionButton
                    key={num}
                    onClick={() => setCurPage(num)}
                    isactive={curPage === num}
                >
                    {num}
                </PaginagionButton>
            ))}

            <PaginagionButton
                onClick={handleNext}
                isdisabled={curPage === totalPage}
            >
                다음
            </PaginagionButton>
        </PaginationContainer>
    );
})

export default Pagination;