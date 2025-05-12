# 사용할 Node.js 베이스 이미지 (원하는 버전에 맞게 선택)
FROM node:18

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 코드 복사
COPY ./ /usr/src/app

# 컨테이너가 외부에 노출할 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]