# 아슬란 아카데미 NFT 서버 명세서

## 수정사항

AWS EC2 만으로 베포할시 용량 문제가 있어서 EC2, RDS를 이용했습니다.
도커 삭제했습니다.
서버 고정 ip, port : http://3.39.101.97:8000

## DB_ERD

![](https://velog.velcdn.com/images/jiumin/post/07f3430e-3979-4a9a-80a6-bb773b051152/image.png)

## API

### 1. 지갑 로그인

민팅, 기부 등 기능 실행시 로그인 조건을 전제로 합니다.
로그인 성공시 jwt 토큰을 응답합니다.
(지갑 모양 버튼을 눌렀을때 해당 api 요청)
단, 지갑 주소 조회 후 db에 등록된 유저가 아닐시 디스코드 인증 요청 에러 응답함

Request
(Path Variable:로그인 할 지갑주소)

```
[Get] http://3.39.101.97:8000/user/login?walletAddress=0xf1DDF8a3B9f86aF120C4f7E5AdA662975336C9Bd

```

Response
로그인 성공시

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNjb3JkSWQiOiI0MTE4MDA0MTc3Mzk5OTcxODQiLCJpYXQiOjE2OTc1MjcyNjksImV4cCI6MTY5NzUzMDg2OX0.AmeZcrsgdfaDRi6qP5f6XEQNmcwWs3La3GFFf2HTLy4"
}
```

### 2. 디스코드 인증

지갑 로그인한 유저가 db에 등록된 유저가 아닐시 디스코드 인증을 합니다.
아슬란 아카데미 디스코드 서버를 조회한 후 인증 성공시 db에 유저 정보를 저장 후 jwt 토큰을 응답합니다.
요청 바디에 지갑주소와 디스코드 닉네임을 입력해 주세요.

Request

```
[Post] http://3.39.101.97:8000/user/auth

body:

{
    "walletAddress": "0xf1DDF8a3B9f86aF120C4f7E5AdA662975336C9Bd",
    "discordTag" : "jiumin94"
}
```

Response

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNjb3JkSWQiOiI0MTE4MDA0MTc3Mzk5OTcxODQiLCJpYXQiOjE2OTc1MjcyNDcsImV4cCI6MTY5NzUzMDg0N30.AllYf4-97kIq1TGUkMvnReVv5iq7trSJorELc8izg4c"
}
```

### 3. 기부

nft 민팅시 프리미엄 파츠를 원할 경우 기부를 통해서 사용할 수 있습니다.
컨트랙트 기부 함수 진행 후 해당 api를 통해 유저의 기부내역을 db에 저장합니다.
(로그인 시 발급 받은 jwt 토큰을 request 요청시 header에 bearer토큰으로 넣어주셔야 합니다.)
요청 바디에는 기부한 양을 int 형식으로 넣어주세요.

Request

```
[Post] http://3.39.101.97:8000/user/donate

body:

{
    "amount": 50
}
```

### 4. 기부내역 확인

유저의 기부 내역을 확인 하는 api입니다.
(로그인 시 발급 받은 jwt 토큰을 request 요청시 header에 bearer토큰으로 넣어주셔야 합니다.)
토큰을 이용해 요청한 유저를 확인해 해당 유저의 기부내역을 확인합니다.
해당 유저의 기부 내역 있을시 기부내역 정보를 응답합니다.
없을시 에러를 응답합니다.

Request

```
[Get] http://3.39.101.97:8000/user/isDonate
```

### 5. 민팅 중복 조합 체크

유저가 조합한 nft 조합 번호를 db에서 조회 합니다.
중복값이 없을시 민팅 가능하다는 true를 응답하고
증복값이 존재할 경우 민팅 불가능 하다는 false를 응답합니다.

Request
(Path Variable:조합 id)

```
[Get] http://3.39.101.97:8000/user/checkOverlap?combination=123456789
```

Response

```
{
  "available" : true || false
}
```

### 5. 민팅 등록

유저가 스마트컨트랙트로 민팅 후 유저의 민팅 내역을 저장합니다.
요청 바디에는 조합한 조합번호 id와 민팅한 nft의 ipfs 이미지 주소를 넣어주세요.

Request

```
[Post] http://3.39.101.97:8000/user/mint

body:

{
    "combination" : "12345678",
    "imgUrl" : "http://ipfs.aslantest.co.kr"
}
```

### 6. nft 파츠정보 가져오기

Nft의 파츠 정보들을 가져옵니다.
해당 파츠의 정보와 이미지 주소, 프리미엄 파츠인지 등을 알려줍니다.

Request

```
[Get] http://3.39.101.97:8000/nfts/getParts

```

### 6. (Main 페이지용) 유저들 nft 이미지 불러오기

Main 페이지에 나오는 유저들이 민팅한 nft들의 이미지 주소를 응답합니다. 최근 10개의 이미지 주소만 불러옵니다.

Request

```
[Get] http://3.39.101.97:8000/user/nftMain

```

Response

```
[
    {
        "imgUrl": "http://ipfs.aslantest1.co.kr"
    },
    {
        "imgUrl": "http://ipfs.aslantest2.co.kr"
    },
    {
        "imgUrl": "http://ipfs.aslantest3.co.kr"
    }

    .
    .
    .
]
```

### 7. (Main 페이지용) 유저들 nft 이미지 불러오기

유저들이 민팅한 모든 nft의 이미지 주소와 조합 id를 응답합니다.

Request

```
[Get] http://3.39.101.97:8000/user/usersNft

```

Response

```
[
    {
        "combination": "12345678",
        "imgUrl": "http://ipfs.aslantest1.co.kr"
    },
    {
        "combination": "23456789",
        "imgUrl": "http://ipfs.aslantest2.co.kr"
    },
    {
        "combination": "34567890",
        "imgUrl": "http://ipfs.aslantest3.co.kr"
    },

    .
    .
    .
]
```

### 8. (Main 페이지용) 유저들 nft 이미지 불러오기

요청한 유저의 유저 정보와 유저가 요청한 nft 정보를 가져옵니다.
(로그인 시 발급 받은 jwt 토큰을 request 요청시 header에 bearer토큰으로 넣어주셔야 합니다.)
토큰을 이용해 요청한 유저를 확인해 해당 유저의 nft를 확인합니다.

Request

```
[Get] http://3.39.101.97:8000/user/userNft

```

Response

```
{
    "id": 1,
    "combination": "12345678",
    "imgUrl": "http://ipfs.aslantest.co.kr",
    "user": {
        "id": 1,
        "walletAddress": "0xf1DDF8a3B9f86aF120C4f7E5AdA662975336C9Bd",
        "discordId": "411800417739997184",
        "discordTag": "jiumin94",
        "createAt": "2023-10-16T09:34:04.626Z"
    }
}
```
