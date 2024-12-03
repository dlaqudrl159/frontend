import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AllAptData from './data/AllAptData';
import AllCoordsData from './data/AllCoordsData';
import AptData from "./data/AptData";
import CoordsData from "./data/CoordsData";
import CleanCoords from "./data/CleanCoords";

const DashBoard = memo(() => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/');
    };

    useEffect(() => {
        const dashboardToken = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('/auth/admin/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // 성공 처리
                setIsLoggedIn(true);
            } catch (error) {
                if (error.response?.status === 403) {
                    console.log('권한 없음');
                    localStorage.removeItem('token');
                }
                setIsLoggedIn(false);
                navigate("/");
            }
        };
        dashboardToken();
    }, [navigate, setIsLoggedIn]);

    return (
        <>
            {isLoggedIn ? (<div style={styles.dashboardContainer}>
                <div style={styles.header}>
                    <h2 style={styles.title}>대시보드</h2>
                    <button onClick={logout} style={styles.button}>
                        로그아웃
                    </button>
                </div>
                <div style={styles.content}>
                    <h3>전체 지역 데이터 입력</h3>
                    <p><AllAptData /></p>
                    
                </div>
                <div style={styles.content}>
                    <h3>특정 지역 데이터 입력</h3>
                    <p><AptData /></p>
                </div>
                <div style={styles.content}>
                    <h3>전체 지역 좌표 입력</h3>
                    <p><AllCoordsData /></p>
                </div>
                <div style={styles.content}>
                    <h3>특정 지역 좌표 입력</h3>
                    <p><CoordsData /></p>
                </div>
                {/* <div style={styles.content}>
                    <h3>좌표 정리</h3>
                    <p><CleanCoords /></p>
                </div> */}
            </div>) : (<div></div>)}
        </>
    )

});

const styles = {
    dashboardContainer: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        height: '100%'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    button: {
        padding: '12px',
        backgroundColor: '#ccc',
        color: 'black',
        border: '1px solid #ccc',
        width: '10%',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginLeft: '70%'
    },
    content: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
    }
}

export default DashBoard