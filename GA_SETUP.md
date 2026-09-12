# 머니통 GA4 + Search Console 연동 세팅 (대표님 파트)

코드는 다 붙었습니다. 아래 **구글 계정쪽 설정만** 대표님이 하시면 자가개선 루프가 실데이터로 완전자동이 됩니다.
(인증정보·계정생성·권한부여는 안전정책상 일론머스크가 대신 못 합니다.)

## 1. GA4 태그 켜기 (데이터 생성 시작)
1) [analytics.google.com](https://analytics.google.com) → 속성 만들기 → **측정 ID** 확보(`G-XXXXXXXXXX`).
2) 배포 환경변수에 설정: Cloudflare Pages 프로젝트 → Settings → Environment variables →
   `NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX` → 재배포.
   → layout.js가 이 값 있을 때만 gtag를 심음(실검증 완료: 값 넣고 빌드 시 산출 HTML에 gtag 출력 확인).
3) 이때부터 방문자 데이터가 GA4에 쌓이기 시작(과거 데이터는 소급 안 됨 — 트래픽 축적 필요).

## 2. Search Console (검색어 데이터)
- [search.google.com/search-console](https://search.google.com/search-console) 에서 `moneytong.com` 속성 등록·소유확인(도메인 방식 권장 → `sc-domain:moneytong.com`).

## 3. 서비스계정 (헤드리스 자동수집용 인증)
1) [console.cloud.google.com](https://console.cloud.google.com) → 프로젝트 → **API 사용설정**: "Google Analytics Data API", "Search Console API".
2) IAM → 서비스계정 생성 → **JSON 키 다운로드** → 맥북 안전한 경로에 저장(예: `~/.config/moneytong/ga_sa.json`).
3) 이 서비스계정 이메일(`...@...iam.gserviceaccount.com`)에 권한 부여:
   - GA4: 속성 → 관리 → 속성 액세스 관리 → 뷰어로 추가.
   - Search Console: 속성 → 설정 → 사용자 및 권한 → 제한 사용자로 추가.

## 4. 하네스 환경변수
```bash
export MT_GA_SA_KEY="$HOME/.config/moneytong/ga_sa.json"
export MT_GA4_PROPERTY_ID="123456789"          # GA4 속성 ID(숫자, 관리>속성설정)
export MT_SC_SITE_URL="sc-domain:moneytong.com"
```

## 5. 완전자동 루프 실행
```bash
# 실성과데이터 수집(GA4+SC) → 통계파일
venv/bin/python -m scripts.moneytong_fetch_stats --days 7
# → 그 파일로 자가개선 제안(검수 대기)
venv/bin/python -m scripts.moneytong_weekly_improve --stats moneytong/perf_stats/<날짜>_stats.txt
```
주 1회 스케줄 등록 시 `scripts/memory_guard.sh`로 감싸 실행.

## 상태 (정직 표기)
- ✅ 코드/태그/HALT경로: 실검증 완료(빌드통과·gtag 실출력·인증없음 HALT 확인).
- ⚠️ **라이브 데이터 당김은 미검증** — 위 1~4 세팅(인증정보)이 있어야 실제 API 호출이 되며, 그건 대표님 파트라 현재 확인 불가. 세팅 후 `fetch_stats` 첫 실행으로 검증됩니다.
