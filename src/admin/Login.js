import React, { memo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = memo(() => {

    const [userId, setUserId] = useState('');
    const [userPassword, setPassword] = useState('');
    const navigator = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/admin/login', {
                userId: userId,
                userPassword: userPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                // axios 기본 설정에 토큰 추가
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                navigator("/admin/dashboard")
            }
        } catch (error) {
            alert('로그인 실패!!');
        }
    }

    return (
        <>
            <div style={styles.loginContainer}>
                <h2 style={styles.title}>로그인</h2>
                <input value={userId} style={styles.input} type="text" placeholder="아이디를 입력하세요" onChange={(e) => setUserId(e.target.value)}></input>
                <input value={userPassword} style={styles.input} type="password" placeholder="비밀번호를 입력하세요" onChange={(e) => setPassword(e.target.value)}></input>
                <button style={styles.button} onClick={login}>로그인</button>
            </div>
        </>
    )

});

const styles = {
    loginContainer: {
        maxWidth: '400px',
        margin: '40px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        backgroundColor: '#fff'
    },
    title: {
        margin: '0 0 20px 0',
        color: '#333',
        textAlign: 'center'
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
        width: '100%',
        margin: '5px'
    },
    button: {
        padding: '12px',
        backgroundColor: '#ccc',
        color: 'black',
        border: '1px solid #ccc',
        width: "30%",
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginLeft: '70%'
    },
}

export default Login