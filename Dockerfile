# 1단계: 빌드
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: 실행 (Nginx)
FROM nginx:stable-alpine
# 빌드된 'build' 폴더 내용을 Nginx 웹 루트로 복사
COPY --from=build-stage /app/build /usr/share/nginx/html
# 커스텀 Nginx 설정 적용
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]