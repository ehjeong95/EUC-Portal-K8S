const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const cors = require('cors'); // CORS 패키지 임포트
const app = express();

// CORS 설정을 가장 먼저 적용
app.use(cors({
  origin: 'http://apache2:4433',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// 메모리 스토어 설정
const memoryStore = new session.MemoryStore();

// express-session 설정
app.use(session({
  secret: '123123',  // 안전한 비밀키로 변경 필요
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Keycloak 설정 (keycloak.json 파일을 통해 Keycloak 서버와 통합)
const keycloak = new Keycloak({ store: memoryStore });

// Keycloak 미들웨어 설정: 로그인 후 리디렉션 URL을 프론트엔드로 지정
app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}));

app.get('/logout', keycloak.protect(), (req, res) => {
  const logoutUrl = keycloak.logoutUrl(req);
  // 로그아웃 후 홈 화면으로 리디렉션
  res.redirect('http://apache2:4433/');
});

// 보호된 라우트 - 사용자 정보 반환
app.get('/userinfo', keycloak.protect(), (req, res) => {
  // 수정된 사용자 정보 접근 방식
  const token = req.kauth.grant.access_token;
  res.json({
    username: token.content.preferred_username,
    email: token.content.email,
    // 기타 필요한 사용자 정보
  });
});

// 보호된 라우트: 인증 후 프론트엔드 페이지로 리디렉션
app.get('/protected', keycloak.protect(), (req, res) => {
  // 인증된 후 /protected 페이지 대신 프론트엔드 페이지로 리디렉션
  res.redirect('http://apache2:4433');
});

// 공개 페이지: 아무런 인증 없이 접근 가능
app.get('/', (req, res) => {
  //res.send('환영합니다. 로그인 후 보호된 페이지에 접근하세요.');
  res.redirect('http://apache2:4433/');
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});


app.get('/links', keycloak.protect(), (req, res) => {
  res.json({
    google:        'https://accounts.google.com',
    vCenter:       'https://vcsa.elhee.site/ui',
    oaDesktop:     'https://192.168.0.200/?desktopId=Pool01&action=start-session',
    secureDesktop: 'vmware-view://192.168.0.200/Pool01?action=start-session'
  });
});
