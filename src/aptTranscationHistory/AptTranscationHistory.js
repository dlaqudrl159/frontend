import React, { useEffect, useRef, useState, memo, useMemo } from 'react';
import { AptTranscationHistoryContainer, AptTranscationHistoryContent, AptTranscationHistoryHeader, AptTranscationHistoryHeaderCloseButton, AptTranscationHistoryHeaderJibun, AptTranscationHistoryHeaderRoadName, AptTranscationHistoryHeaderTitle, AptTranscationHistoryOverlay } from '../styles/AptTranscationHistory.Styles';
import { Box } from '@mui/material';

const AptTranscationHistory = memo(({ selectedMarkerData, setSelectedMarkerData }) => {
    const modalRef = useRef();

    const [selectedRoadIndex, setSelectedRoadIndex] = useState(0);  // 기본값 0으로 첫 번째 데이터 선택
    console.log(selectedMarkerData)
    const [selectedYear, setSelectedYear] = useState(
        selectedMarkerData[0].years[0].toString()
    );

    const handleRoadChange = (e) => {
        const newIndex = Number(e.target.value);
        setSelectedRoadIndex(newIndex);
        setSelectedYear(selectedMarkerData[newIndex].years[0].toString());
    };

    const currentApt = selectedMarkerData[selectedRoadIndex];

    const groupedByMonth = useMemo(() => {

        if (currentApt.aptTransactionDtos !== null) {
            const filteredData = currentApt.aptTransactionDtos
                .filter(item => item.year.toString() === selectedYear)
                .sort((a, b) => {
                    // dealyearmonth 기준으로 내림차순 정렬 (예: 202412 -> 202401)
                    return b.dealyearmonth - a.dealyearmonth;
                });

            // 월별로 그룹화
            const groups = {};
            filteredData.forEach(item => {
                const month = item.dealyearmonth.substring(4, 6);
                if (!groups[month]) {
                    groups[month] = [];
                }
                groups[month].push(item);
            });

            return groups;
        }

        return {};

    }, [currentApt, selectedYear]);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setSelectedMarkerData(null);
            }
        };
        document.body.style.overflow = 'hidden';
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [setSelectedMarkerData]);



    return (
        <AptTranscationHistoryOverlay className='aptTranscationHistoryOverlay'>
            <AptTranscationHistoryContainer className='aptTranscationHistoryContainer' ref={modalRef}>
            <AptTranscationHistoryHeaderCloseButton onClick={() => { setSelectedMarkerData(null) }}>X</AptTranscationHistoryHeaderCloseButton>
                <AptTranscationHistoryHeader className='aptTranscationHistoryHeader'>
                    
                    {/* <Box sx={{overflow : 'auto', width : '100%'}}> */}
                        <AptTranscationHistoryHeaderTitle variant='h4'>[아파트] {currentApt.aptCoordsDto.apartmentname}</AptTranscationHistoryHeaderTitle>
                        <AptTranscationHistoryHeaderJibun variant='h6'>{currentApt.aptCoordsDto.sigungu} {currentApt.aptCoordsDto.bungi}</AptTranscationHistoryHeaderJibun>
                        <AptTranscationHistoryHeaderRoadName variant='h6'>{currentApt.aptCoordsDto.roadname}</AptTranscationHistoryHeaderRoadName>
                    

                    <select
                        value={selectedRoadIndex}
                        onChange={handleRoadChange}
                        style={styles.roadSelect}
                    >
                        {selectedMarkerData.map((data, index) => (
                            <option key={index} value={index}>
                                {data.aptCoordsDto.roadname}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        style={styles.yearSelect}
                    >
                        {currentApt.years.map(year => (
                            <option key={year} value={year}>{year}년</option>
                        ))}
                    </select>
                    {/* </Box> */}
                </AptTranscationHistoryHeader>

                <AptTranscationHistoryContent className='aptTranscationHistoryContent'>

                    {Object.entries(groupedByMonth).map(([month, deals]) => (
                        <div key={month} style={styles.monthGroup}>
                            <h3 style={styles.monthTitle}>{month}월</h3>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>거래일</th>
                                        <th style={styles.th}>전용면적(㎡)</th>
                                        <th style={styles.th}>층</th>
                                        <th style={styles.th}>거래금액(만원)</th>
                                        <th style={styles.th}>등기일자</th>
                                        <th style={styles.th}>동</th>
                                        <th style={styles.th}>매수자</th>
                                        <th style={styles.th}>매도자</th>
                                        <th style={styles.th}>거래유형</th>
                                        <th style={styles.th}>중개사소재지</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deals.map((deal, idx) => (
                                        <tr key={idx}>
                                            <td style={styles.td}>{deal.dealday}일</td>
                                            <td style={styles.td}>{parseFloat(deal.areaforexclusiveuse).toFixed(2)}</td>
                                            <td style={styles.td}>{deal.floor}층</td>
                                            <td style={styles.td}>{deal.dealamount}</td>
                                            <td style={styles.td}>{deal.registrationdate}</td>
                                            <td style={styles.td}>{deal.apartmentdong}</td>
                                            <td style={styles.td}>{deal.buyergbn}</td>
                                            <td style={styles.td}>{deal.sellergbn}</td>
                                            <td style={styles.td}>{deal.reqgbn}</td>
                                            <td style={styles.td}>{deal.rdealerlawdnm}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </AptTranscationHistoryContent>
            </AptTranscationHistoryContainer>
        </AptTranscationHistoryOverlay>
    );
});

const styles = {
    closeButton: {
        position: 'absolute',
        right: '20px',
        top: '20px',
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '5px',
    },
    roadSelect: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        backgroundColor: '#f8f9fa',
        fontSize: '15px',
    },
    yearSelect: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '15px',
    },
    monthGroup: {
        marginBottom: '30px',
        padding: '0 20px',
    },
    monthTitle: {
        padding: '15px 0',
        borderBottom: '2px solid #007bff',
        marginBottom: '15px',
        color: '#007bff',
        fontSize: '18px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        fontSize: '14px',
    },
    th: {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        fontWeight: 'bold',
    },
    td: {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'center',
        verticalAlign: 'middle',
    },
};

export default AptTranscationHistory;