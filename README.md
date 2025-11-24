# Justitia

음악에 대한 대중 여론을 분석하고 시각화하는 플랫폼입니다. YouTube 댓글과 Twitter(X) 멘션을 수집하여 감성 분석을 수행하고, 일별 여론 요약 및 트렌드를 제공합니다.

## 주요 기능

- **일별 여론 요약**: 날짜별로 수집된 데이터를 기반으로 여론 요약 제공
- **감성 분석**: AI 기반 댓글 감성 분석 (긍정/중립/부정)
- **감성 트렌드**: 날짜별 감성 변화 추이 시각화
- **댓글 목록**: 수집된 댓글 목록 및 감성 라벨 표시
- **플랫폼별 평점**: 다양한 음악 플랫폼의 평점 통합

## 기술 스택

### Frontend
- **Framework**: Next.js 15 (Turbopack)
- **UI**: React 19, Tailwind CSS 4
- **Charts**: Recharts
- **Language**: TypeScript

### Backend
- **Framework**: NestJS 11
- **Database**: MySQL (TypeORM)
- **AI/ML**: Hugging Face Inference API
- **API Docs**: Swagger

## 프로젝트 구조

```
Justitia/
├── frontend/          # Next.js 프론트엔드
│   └── src/
│       ├── app/       # App Router 페이지
│       ├── components/# React 컴포넌트
│       ├── lib/       # API 클라이언트
│       └── types/     # TypeScript 타입 정의
│
├── backend/           # NestJS 백엔드
│   └── src/
│       ├── youtube/       # YouTube 댓글 수집
│       ├── xMention/      # Twitter(X) 멘션 수집
│       ├── sentiment/     # 감성 분석 서비스
│       ├── dailySummary/  # 일별 요약 서비스
│       ├── dailyFinalScore/ # 일별 최종 점수
│       ├── musicScore/    # 음악 점수 관리
│       └── db/            # 데이터베이스 설정
│
└── main leaderboard/  # 메인 리더보드
```

## 설치 및 실행

### 사전 요구 사항
- Node.js 18+
- pnpm 또는 npm
- MySQL 데이터베이스

### Backend 설정

```bash
cd backend

# 의존성 설치
pnpm install

# 환경 변수 설정 (.env 파일 생성)
# DATABASE_HOST=localhost
# DATABASE_PORT=3306
# DATABASE_USER=your_user
# DATABASE_PASSWORD=your_password
# DATABASE_NAME=justitia

# 개발 서버 실행
pnpm run start:dev
```

### Frontend 설정

```bash
cd frontend

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run dev
```

### 접속
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Docs (Swagger): http://localhost:3001/api

## API 엔드포인트

| 엔드포인트 | 설명 |
|------------|------|
| `GET /youtube/videos` | YouTube 비디오 목록 |
| `GET /youtube/comments/score` | 댓글 및 감성 점수 |
| `POST /sentiment/analyze/:videoId` | AI 감성 분석 실행 |
| `GET /daily-summary` | 일별 여론 요약 |
| `GET /x-mention` | Twitter 멘션 데이터 |

## 라이선스

This project is private and proprietary.