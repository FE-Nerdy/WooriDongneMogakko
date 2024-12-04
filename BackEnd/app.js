const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

const PORT = 4000;
const JWT_SECRET = "your_jwt_secret";

//Cors허용

//Postman 또는 cURL
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
}));
// 미들웨어
app.use(bodyParser.json());

const mysql = require("mysql2");
// MySQL 연결
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abcd1234",
  database: "users",
});

module.exports = db;

db.connect((err) => {
  if (err) {
    console.error("DB 연결 실패:", err);
  } else {
    console.log("DB 연결 성공");
  }
});

// 회원가입 엔드포인트
app.post("/register", async (req, res) => {
  const { email, password, nickname } = req.body;

  // 입력값 확인
  if (!email || !password) {
    //서버가 클라이언트의 요청을 이해하지 못할 때 발생하는 오류
    return res.status(400).json({ message: "이메일과 비밀번호를 입력해주세요." });
  }

  try {
    // 데이터베이스에 사용자 저장
    console.log("someone come");
    db.query(
      "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
      [email, password, nickname],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "이미 사용 중인 이메일입니다." });
          }
          console.log(err.code);
          //내부서버 오류
          return res.status(500).json({ message: "회원가입 실패" });
          console.log("내부서버오류");
        }
        // 요청이 성공적으로 처리되어서 리소스가 만들어졌음을 의미
        res.status(201).json({ message: "회원가입 성공" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
    console.log("register catch 오류");
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // email이나 비밀번호가 없을 시
  if (!email || !password) {
    return res.status(400).json({ message: "이메일과 비밀번호를 다시 입력해주세요." });
  }

  // 사용자 조회
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.log("db error");
      return res.status(500).json({ message: "로그인에 실패했습니다." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
    }

    const user = results[0];

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    // JWT 토큰 발급
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // 1시간 유효
    });

    res.json({ message: "로그인 성공!", token });
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Port: ${PORT}`)
  console.log('listening...');
});

//refresh토큰 필요