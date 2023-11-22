FROM node:18-alpine

COPY ./package.json /usr/
COPY ./package-lock.json /usr/
WORKDIR /usr/
RUN npm install

COPY . /usr/

CMD ["npm", "run", "start:prod"]

# ----------------------------

# FROM node:18-alpine

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY ./ ./

# CMD ["npm", "run", "start:dev"]

# -----------------------------

# FROM node:16-alpine

# # 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사
# COPY ./package.json /src/
# COPY ./yarn.lock /src/
# WORKDIR /src/
# RUN yarn install

# COPY . /src/
# EXPOSE 3000 
# # 3. 도커안에서 index.js 실행시키기
# CMD yarn start:dev