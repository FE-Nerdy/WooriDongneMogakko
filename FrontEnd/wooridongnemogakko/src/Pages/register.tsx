import { useState } from "react";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

interface Token {
  token: string
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호를 다시 입력해주세요");
      return;
    }
    try {
      const res = await axios.post<Token>("/api/register", formData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
        localStorage.setItem('token', data.token);
        console.log('회원가입 성공');
      }
    catch (error) {
      console.error(error);

      // 추후 에러 핸들링 예정
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
      else {
        console.log('error');
      }
    }
  }

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="이메일을 입력해주세요." value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="비밀번호를 입력해주세요" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="비밀번호를 다시 입력해주세요." value={formData.confirmPassword} onChange={handleChange} required />
        <input type="text" name="nickname" placeholder="닉네임을 입력해주세요" value={formData.nickname} onChange={handleChange} required />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Register;