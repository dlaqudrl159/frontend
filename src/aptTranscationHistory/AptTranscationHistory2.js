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
        <Box sx={{
            position: 'absolute',
            height: '100dvh',
            width : '100%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
        }} className='aptTranscationHistoryOverlay'>

            <Box sx={{
                margin : 'auto',
                backgroundColor: 'white',
                borderRadius: '8px',
                width: '80%',
                minWidth : `80%`,
                height: '80%',
                display: 'flex',
                flexDirection: 'column',
            }}></Box> 

        </Box>
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