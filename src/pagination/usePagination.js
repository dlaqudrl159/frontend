import React, {memo, useState} from "react";

export const usePagination = (data) => {

    const amount = data.length;
    const [curPage, setCurPage] = useState(1);
    const perPage = 10;
    const perLine = 5;

    const totalPage = Math.ceil(amount / perPage);
    const startNum = (curPage - 1) * perPage + 1;
    const endNum = Math.min(curPage * perPage, amount);
    const beginPageNum = Math.floor((curPage - 1) / perLine) * perLine + 1;
    const finishPageNum = Math.min(beginPageNum + perLine - 1, totalPage);


    return {curPage, setCurPage, amount, totalPage, startNum, endNum, beginPageNum, finishPageNum}

}

