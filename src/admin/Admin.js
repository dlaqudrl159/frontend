import axios from "axios";
import React, { useState, memo } from "react";

const Admin = memo(() => {

    const [userId, setUserid] = useState('');
    const [userPw, setpw] = useState('');

    const OnClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/admin/login', {
               
                    userId : userId,
                    userPw : userPw
                
            }, {
                headers: {
                'Content-Type': 'application/json',
            },
        })

            if(!response.ok) {
                alert("로그인에 실패했습니다");
                return;
            }
        } catch (error) {

        }
    }

    return (
        <>

            <h1>관리자 페이지</h1>
            <input value={userId} placeholder="아이디를 입력하세요" onChange={(e) => setUserid(e.target.value)}></input>
            <input value={userPw} placeholder="비밀번호를 입력하세요" onChange={(e) => setpw(e.target.value)}></input>
            <button onClick={OnClick}>제출</button>
            

        </>
    );

})

export default Admin;