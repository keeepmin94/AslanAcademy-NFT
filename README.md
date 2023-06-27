## ** 1. 지갑 로그인**

지갑 로그인후 요청하는 request. 지갑 로그인 후 저장되어있는 유저정보가 있으면 토큰 응답. 없을시 에러 응답

- **URL**

  /user/login?walletAddress=지갑주소

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `walletAddress=[string]`

- **Data Params**

  None

- **Success Response:**

  유저 정보 있을시 민팅이나 민팅 조회등 기능 수행 가능한 토큰 발급

  - **Code:** 200 <br />
    **Content:** <br />`{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNjb3JkSWQiOiI0MTE4MDA0MTc3Mzk5OTcxODQiLCJpYXQiOjE2ODc3NzM0MzgsImV4cCI6MTY4Nzc3NzAzOH0.XTOpGFwJEtO4LB3xDLBIcSj4IhPLq7ON4EefhK2qmek"
}`

- **Error Response:**

  유저 정보 없을시 에러 반환. 지갑 로그인 한 상태로 디스코드 인증을 통해 유저 정보 등록 요청

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    `{`
    `"statusCode": 404,`
    `"message": "Can't find User
    0xf1DDF8a3B9f86aF120C4f7E5AdA662975336C9aa",`
    `"error": "Not Found"`
    `}`

---

## ** 2. 디스코드 인증**

클라이언트에서 지갑 로그인한 상태에서 디스코드 인증 요청.
아슬란 아카데미 디스코드에 있는 경우 유저 정보를 저장 후 토큰 응답.
없을시 에러 응답.

- **URL**

  /user/auth

- **Method:**

  `POST`

- **URL Params**

None

- **Data Params**

  `walletAddress=[string]`
  `discordTag=[string]`

- **Success Response:**

  디스코드 인증 성공시 유저 정보 저장 후 토큰 발급

  - **Code:** 201 <br />
    **Content:** <br />`{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNjb3JkSWQiOiI0MTE4MDA0MTc3Mzk5OTcxODQiLCJpYXQiOjE2ODc3NzM0MzgsImV4cCI6MTY4Nzc3NzAzOH0.XTOpGFwJEtO4LB3xDLBIcSj4IhPLq7ON4EefhK2qmek"
}`

- **Error Response:**

  유저 정보 없을시 에러 반환. 지갑 로그인 한 상태로 디스코드 인증을 통해 유저 정보 등록 요청

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    `{
    "statusCode": 404,`
    `"message": "${id} User doesn't exist on our Discord server. ",`
    `"error": "Not Found"`
    `}`

- **Notes:**

  discordTag는디스코드 사용자명 기입
  예전 형식(홍길동#0123)인 경우 #앞쪽만(홍길동) 입력

---

## ** 3. 기부**

프리미엄 파츠 사용을 위한 유저의 코인 기부

- **URL**

  /user/donate

- **Method:**

  `POST`

- **URL Params**

None

- **Data Params**

  `amount=[number]`

- **Authoriaztion**

  **Required:**
  Bearer Token

- **Success Response:**

  유저의 기부 내역 저장

  - **Code:** 201 <br />

- **Error Response:**

  저장 실패시 에러

  - **Code:** 500 Internal Server Error <br />

---

## ** 4. 기부 내역 확인**

프리미엄 파츠 사용을 위한 유저의 기부 내역 확인

- **URL**

  /user/isDonate

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `walletAddress=[string]`

- **Data Params**

  None

- **Authoriaztion**

  **Required:**
  Bearer Token

- **Success Response:**

  기부 내역 데이터 존재시 반환

  - **Code:** 200 <br />
    **Content:** <br />`{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNjb3JkSWQiOiI0MTE4MDA0MTc3Mzk5OTcxODQiLCJpYXQiOjE2ODc3NzM0MzgsImV4cCI6MTY4Nzc3NzAzOH0.XTOpGFwJEtO4LB3xDLBIcSj4IhPLq7ON4EefhK2qmek"
}`

- **Error Response:**

  기부 내역 없을시 404 NOT FOUND

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    `{`
    `"statusCode": 404,`
    `"message": "Can't find User
    0xf1DDF8a3B9f86aF120C4f7E5AdA662975336C9aa",`
    `"error": "Not Found"`
    `}`

---

## ** 5. 민팅 조합 중복 체크**

유저가 조합한 민팅 조합이 중복인지 체크

- **URL**

  /user/checkOverlap

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `combination=[string]`

- **Data Params**

  None

- **Authoriaztion**

  **Required:**
  Bearer Token

- **Success Response:**

  중복 조합 없으면 true 응답, 이미 있을시 false 응답

  - **Code:** 200 <br />
    **Content:** <br />`{
    "available": true || false
}`

- **Error Response:**

  - **Code:** 500 Internal Server Error <br />

- **Notes:**

  중복 체크 결과를 true, false로 반환 할것인지 에러 처리로 할 것인지?

---

## ** 6. 민팅 등록**

민팅시 유저의 민팅 조합 저장

- **URL**

  /user/mint

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  **Required:**

  `combination=[string]`

- **Authoriaztion**

  **Required:**
  Bearer Token

- **Success Response:**

  저장 성공시 200 코드 응답

  - **Code:** 200 <br />

- **Error Response:**

  - **Code:** 500 Internal Server Error <br />

- **Notes:**

  - 이미지 ifps 등록 서버처리 할것인지?
  - todo: 조합 저장 전 이미 존재하는지 로직 추가

---

테스트용 local db 설정 docker-compose.yml에 작성

```
docker-compose up -d
```

## todo
- config 파일들 따로 설정
- custom repository 삭제
- 파일/폴더 정리
- 코드 리팩터링
- 코드 개선