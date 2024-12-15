import React, { memo } from "react";

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

    return (
        <div style={styles.pagination}>

            <button
                onClick={handlePrev}
                style={{
                    ...styles.pageButton,
                    ...(curPage === 1 ? styles.disabledButton : {})
                }}
            >
                이전
            </button>


            {pageNumbers.map(num => (
                <button
                    key={num}
                    onClick={() => setCurPage(num)}
                    style={{
                        ...styles.pageButton,
                        ...(curPage === num ? styles.activePageButton : {})
                    }}
                >
                    {num}
                </button>
            ))}

            <button
                onClick={handleNext}
                style={{
                    ...styles.pageButton,
                    ...(curPage === totalPage ? styles.disabledButton : {})
                }}
            >
                다음
            </button>
        </div>
    );
})

const styles = {
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px 0',
        gap: '5px'
    },
    pageButton: {
        padding: '5px 10px',
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

export default Pagination;