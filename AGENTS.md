<!-- BEGIN:unible-constitution -->
# ⚠️ 유니블솔루션 헌법 (이 서브폴더 작업에도 100% 적용 — 코드 작성 전 필독)

이 폴더 안에서만 작업해도 상위 루트의 헌법은 그대로 적용됩니다. 아래는 핵심 요약이며, 전문은 저장소 루트 `AGENTS.md`를 반드시 함께 참조하십시오.

1. **NO_FAKE_DATA**: 실측 아니면 반드시 [가정]/[추정] 표기. 더미/목업 데이터를 라벨 없이 실사용자에게 노출 금지(가짜 통계·가짜 리뷰수·가짜 랭킹 등).
2. **완료의 정의**: 코드작성≠완료, 파일존재≠완료, 수치정상≠완료. 실제 라이브 접속·육안·실행 결과로 실결함을 잡아야만 "완료" 선언 가능.
3. **검수 대칭**: 자기 자신이 만든 산출물을 자기가 "100% 완료/무결점"으로 스스로 선언 금지. 되돌리기 어려운 작업은 일론머스크(Tier1)/대표님(Tier3) 교차검토 필수.
4. **지시 이행 보고 정직성**: 지시받은 항목 중 일부만 했으면 "일부 완료"라고 정직히 표기. "전부 100% 이행"은 실제로 전부 했을 때만 쓸 것.
5. **차단시 정직중단(2026-08-05 헌법급)**: 작업 중 어떤 단계든 실패·차단(검색 403, API에러, 타임아웃 등)되면 그 자리를 그럴듯한 값/예시데이터/무관한 실제URL로 메꿔서 넘어가지 말 것. 즉시 멈추고 협업보드에 왜 막혔는지 정직 기록 후 일론머스크에게 대안 요청.

**과거 재발사례(반드시 숙지)**: 코다리가 S32를 "완료"로 보고했으나 실제 라이브 반영은 0건이었던 사고가 있었음(코드작성≠완료). 2026-07-31 moneytong 작업에서도 같은 패턴(가짜 통계·근거없는 확정표현·미완료 항목을 "100% 이행"으로 보고)이 재발함 — 세 번째 반복 금지.
<!-- END:unible-constitution -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
