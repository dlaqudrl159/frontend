import React, { useEffect, useRef, useState, memo, useMemo } from 'react';
import { AptTranscationHistoryContainer, AptTranscationHistoryContent, AptTranscationHistoryContentMonthGroup, AptTranscationHistoryContentMonthTitle, AptTranscationHistoryHeader, AptTranscationHistoryHeaderCloseButton, AptTranscationHistoryHeaderJibun, AptTranscationHistoryHeaderRoadName, AptTranscationHistoryHeaderTitle, AptTranscationHistoryOverlay, AptTranscationHistoryRoadMenuItem, AptTranscationHistoryRoadSelect, AptTranscationHistoryYearMenuItem, AptTranscationHistoryYearSelect } from '../styles/AptTranscationHistory.Styles';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AptTranscationHistory = memo(({ selectedMarkerData, setSelectedMarkerData }) => {
    const modalRef = useRef();
    const [selectedRoadIndex, setSelectedRoadIndex] = useState(0);  // 기본값 0으로 첫 번째 데이터 선택
    const [selectedYear, setSelectedYear] = useState(
        selectedMarkerData[0].years[0].toString()
    );
    const handleRoadChange = (e) => {
        const newIndex = Number(e.target.value);
        setSelectedRoadIndex(newIndex);
        setSelectedYear(selectedMarkerData[newIndex].years[0].toString());
    };

    const handleYearChange = (e) => {

        setSelectedYear(e.target.value.toString());
    }

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
            // 각 월별 그룹 내에서 dealday 기준으로 정렬
            Object.keys(groups).forEach(month => {
                groups[month].sort((a, b) => b.dealday - a.dealday);
            });
            return groups;
        }

        return {};
    }, [currentApt, selectedYear]);
    useEffect(() => {

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.closest('.MuiPopover-root')) {
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

                    <AptTranscationHistoryHeaderTitle variant='h4'>[아파트] {currentApt.aptCoordsDto.apartmentname}</AptTranscationHistoryHeaderTitle>
                    <AptTranscationHistoryHeaderJibun variant='h6'>{currentApt.aptCoordsDto.sigungu} {currentApt.aptCoordsDto.bungi}</AptTranscationHistoryHeaderJibun>
                    <AptTranscationHistoryHeaderRoadName variant='h6'>{currentApt.aptCoordsDto.roadname}</AptTranscationHistoryHeaderRoadName>

                    <AptTranscationHistoryRoadSelect
                        value={selectedRoadIndex}
                        onChange={handleRoadChange}
                    >
                        {selectedMarkerData.map((data, index) => (
                            <AptTranscationHistoryRoadMenuItem key={index} value={index}>
                                {data.aptCoordsDto.roadname}
                            </AptTranscationHistoryRoadMenuItem>
                        ))}
                    </AptTranscationHistoryRoadSelect>

                    <AptTranscationHistoryYearSelect
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        {currentApt.years.map(year => (
                            <AptTranscationHistoryYearMenuItem key={year} value={year}>
                                {year}년
                            </AptTranscationHistoryYearMenuItem>
                        ))}
                    </AptTranscationHistoryYearSelect>
                </AptTranscationHistoryHeader>

                <AptTranscationHistoryContent className='aptTranscationHistoryContent'>

                    {Object.entries(groupedByMonth).map(([month, deals]) => (
                        <AptTranscationHistoryContentMonthGroup key={month}>
                            <AptTranscationHistoryContentMonthTitle variant='h3'>{month}월</AptTranscationHistoryContentMonthTitle>
                            <TableContainer>
                                <Table sx={{ minWidth: "900px" }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>거래일</TableCell>
                                            <TableCell>전용면적(㎡)</TableCell>
                                            <TableCell>층</TableCell>
                                            <TableCell>거래금액(만원)</TableCell>
                                            <TableCell>등기일자</TableCell>
                                            <TableCell>동</TableCell>
                                            <TableCell>매수자</TableCell>
                                            <TableCell>매도자</TableCell>
                                            <TableCell>거래유형</TableCell>
                                            <TableCell>중개사소재지</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {deals.map((deal, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>{deal.dealday}일</TableCell>
                                                <TableCell>{parseFloat(deal.areaforexclusiveuse).toFixed(2)}</TableCell>
                                                <TableCell>{deal.floor}층</TableCell>
                                                <TableCell>{deal.dealamount}</TableCell>
                                                <TableCell>{deal.registrationdate}</TableCell>
                                                <TableCell>{deal.apartmentdong}</TableCell>
                                                <TableCell>{deal.buyergbn}</TableCell>
                                                <TableCell>{deal.sellergbn}</TableCell>
                                                <TableCell>{deal.reqgbn}</TableCell>
                                                <TableCell>{deal.rdealerlawdnm}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AptTranscationHistoryContentMonthGroup>
                    ))}
                </AptTranscationHistoryContent>
            </AptTranscationHistoryContainer>
        </AptTranscationHistoryOverlay>
    );
});

export default AptTranscationHistory;