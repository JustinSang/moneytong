// 사이트 정보구조(IA) 단일 소스 — 네비 드롭다운·홈 카테고리·아티클 탐색기가 모두 여기서 파생.
// 애드센스 YMYL 심사 기준: 2대 전문 카테고리로 압축하여 카테고리당 완성도 높은 포스팅을 집중 배치.

export const CATEGORIES = [
  {
    id: "gov-pension",
    label: "정부지원·연금복지",
    icon: "🏛️",
    color: "blue",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    blurb: "놓치면 소멸되는 환급·지원금·연금",
    posts: [
      { slug: "basic-pension", title: "2026 기초연금, 월 최대 34만 9,700원 받는 법", desc: "만 65세 이상 소득 하위 70%. 대상·소득기준·신청법 완벽 정리." },
      { slug: "national-pension", title: "국민연금 예상수령액, 몇 살부터 얼마 받을까?", desc: "출생연도별 수령 나이, 예상액 조회, 조기·연기연금 비교." },
      { slug: "basic-pension-deduction", title: "기초연금 감액 피하는 소득인정액 계산법 및 공제 총정리", desc: "기본재산공제·금융재산 공제·국민연금 연계감액 방어 실무 팁." },
      { slug: "long-term-care-insurance", title: "2026 노인장기요양보험 등급별 혜택 및 월 본인부담금", desc: "1~5등급 및 인지지원등급 판정 기준, 재가급여·시설급여 지원액 총정리." },
      { slug: "health-insurance-dependent", title: "건강보험료 피부양자 자격 유지 조건 및 탈락 방지 가이드", desc: "연 2,000만원 금융소득·재산세 과표 기준 및 임의계속가입 활용법." },
      { slug: "health-insurance-refund", title: "국민건강보험 본인부담상한제 환급금 조회·신청법", desc: "1인당 평균 132만원 환급. 소득분위별 상한액 및 소멸시효 3년 방어." },
      { slug: "work-incentive", title: "2026 근로장려금, 최대 330만원 나도 대상일까?", desc: "단독·홑벌이·맞벌이 가구 조건 및 홈택스 30초 간편신청 가이드." },
      { slug: "unemployment-benefits", title: "2026 실업급여 수급자격·지급액 모의계산 총정리", desc: "1일 상·하한액 기준, 소정급여일수 및 고용센터 이직확인서 확인법." },
    ],
  },
  {
    id: "tax-calc",
    label: "세금·생활금융 계산기",
    icon: "🧮",
    color: "purple",
    gradient: "linear-gradient(135deg, #fa709a, #fee140)",
    blurb: "취득·재산·자동차세·연봉·대출 바로 계산",
    posts: [
      { slug: "acquisition-tax-calculator", title: "취득세 계산기 — 주택 취득세·생애최초 감면 바로 계산", desc: "취득가액만 넣으면 취득세·지방교육세·농특세 자동 산출.", calc: true },
      { slug: "property-tax-calculator", title: "재산세 계산기 — 주택 공시가격으로 세금 바로 계산", desc: "1주택 특례세율·공정시장가액비율·도시지역분 반영.", calc: true },
      { slug: "car-tax-calculator", title: "자동차세 계산기 — 배기량·차령으로 내 차 세금 계산", desc: "cc당 세액·차령 경감(최대 50%)·1월 연납 5% 할인.", calc: true },
      { slug: "salary-calculator", title: "연봉 실수령액 계산기 — 2026 4대보험·세금 공제 후 월급", desc: "국민연금·건보료·소득세 간이세액표 반영 실수령액.", calc: true },
      { slug: "severance-pay-calculator", title: "퇴직금 계산기 — 3개월 평균임금 기준 예상 퇴직금", desc: "근로기준법 법정 산식 및 IRP 이전 절세 팁.", calc: true },
      { slug: "loan-calculator", title: "대출 계산기 — 원리금균등 vs 원금균등 월 상환액·이자", desc: "원금·이율·기간만 넣으면 상환 스케줄 3초 계산.", calc: true },
      { slug: "interest-calculator", title: "예금 이자 계산기 — 일반과세 vs 비과세 세후 수령액", desc: "단리·복리, 이자소득세 15.4% 공제 후 실수령액 계산.", calc: true },
      { slug: "electricity-bill", title: "에어컨 전기세 계산기 — 여름 누진제 3단계 전기요금", desc: "사용량별 한전 누진요율·기후환경요금·부가세 일괄 계산.", calc: true },
      { slug: "contract-power-calculator", title: "상가 계약전력 계산기 — 소상공인 적정 계약전력 산정", desc: "초과사용부가금(최대 300%) 예방 및 기본요금 최적화.", calc: true },
      { slug: "ev-charging-calculator", title: "전기차 충전 요금 계산기 — 완속 vs 급속 vs 구독 비교", desc: "주행거리·전비 기준 계절별·충전방식별 월 충전비 비교.", calc: true },
      { slug: "year-end-tax", title: "연말정산 환급금 극대화 — 13월의 월급 절세 항목 가이드", desc: "신용카드·체크카드 황금비율, 연금저축·IRP 세액공제 한도.", calc: false },
    ],
  },
];

// 확장 로드맵 — 다음에 추가될 카테고리(대표님 승인 후 활성화).
export const PLANNED_CATEGORIES = [
  { id: "insurance", label: "보험·실손", icon: "🛡️", blurb: "실손·보험료 비교" },
  { id: "realestate", label: "부동산·청약", icon: "🏠", blurb: "청약·전세·대출" },
];

// 인기 검색어 트렌딩 바 — 전부 실제 존재하는 글로 연동(죽은 링크 금지).
export const TRENDING = [
  { label: "기초연금 34만 9천원", href: "/blog/basic-pension" },
  { label: "국민연금 예상수령액", href: "/blog/national-pension" },
  { label: "장기요양보험 등급", href: "/blog/long-term-care-insurance" },
  { label: "건보 피부양자 탈락방지", href: "/blog/health-insurance-dependent" },
  { label: "기초연금 소득공제", href: "/blog/basic-pension-deduction" },
  { label: "건보료 본인부담 환급금", href: "/blog/health-insurance-refund" },
  { label: "취득세 계산기", href: "/blog/acquisition-tax-calculator" },
  { label: "연봉 실수령액", href: "/blog/salary-calculator" },
  { label: "자동차세 연납 할인", href: "/blog/car-tax-calculator" },
];

// 외부 유입 링크(광고성 아님, 자체 무료 서비스).
export const EXTERNAL_LINKS = [];

// 파생: 전체 글(홈 탐색기·검색용). 카테고리 순서를 따름.
export const ALL_POSTS = CATEGORIES.flatMap((c) =>
  c.posts.map((p) => ({ ...p, cat: c.label, catId: c.id, color: c.color }))
);
