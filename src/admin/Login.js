import React, { memo, useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { LoginButton, LoginContainer, LoginInput, LoginTitle } from "../styles/Login.Styles";

const Login = memo(() => {

    const [userId, setUserId] = useState('');
    const [userPassword, setPassword] = useState('');
    const navigator = useNavigate();
    const login = useCallback(async (e) => {
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
    })

    return (
        <>
            <LoginContainer>
                <LoginTitle component="h2">로그인</LoginTitle>
                <LoginInput value={userId} type="text" placeholder="아이디를 입력하세요" onChange={(e) => setUserId(e.target.value)}></LoginInput>
                <LoginInput value={userPassword} type="password" placeholder="비밀번호를 입력하세요" onChange={(e) => setPassword(e.target.value)}></LoginInput>
                <LoginButton onClick={login}>로그인</LoginButton>
            </LoginContainer>
        </>
    )

});

export default Login