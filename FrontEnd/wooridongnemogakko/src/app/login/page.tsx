"use client";

import { useState } from "react";
import axios from "axios";

interface LoginForm {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

const Login = () => {
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: "",
        password: "",
    })
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post<LoginResponse>("http://localhost:4000/login", loginForm, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = res.data;
            localStorage.setItem('token', data.token);
            setMessage('로그인 성공');
        }
        catch (error) {
            console.error(error);

            // 추후 에러 핸들링 예정
            if (axios.isAxiosError(error)) {
                console.log(error.response);
            }
            else {
                setMessage('error');
            }
        }
    };
    return (
        <div>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="이메일을 입력해주세요." value={loginForm.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="비밀번호를 입력해주세요." value={loginForm.password} onChange={handleChange} required />
                <button type="submit">로그인</button>
                <div>{message}</div>
            </form>
        </div>
    );
}

export default Login;