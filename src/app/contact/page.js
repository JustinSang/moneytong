export const metadata = {
  title: '서비스 소개 및 문의하기 | 머니통 (MoneyTong)',
  description: '머니통의 설립 목적, 공공데이터 출처, 3단계 팩트체크 원칙 및 제휴·문의 안내.',
};

export default function ContactPage() {
  return (
    <div className="post">
      <h1>서비스 소개 및 문의하기 (About Us & Contact)</h1>
      <p className="post-meta">최종 업데이트: 2026-09-02 · 머니통 편집국</p>
      
      <h3>1. 머니통(MoneyTong) 소개 및 설립 목적</h3>
      <p>
        <strong>머니통(MoneyTong)</strong>은 복잡하고 어려운 금융 정책, 세금 제도, 정부지원금, 연금 복지 정보를 누구나 3분 안에 쉽게 이해하고 실생활에 즉시 적용할 수 있도록 돕는 <strong>생활 금융 전문 가이드 포털</strong>입니다.
      </p>
      <p>
        매년 수많은 정부 복지 정책과 세법이 개정되지만, 복잡한 신청 자격과 까다로운 산식 때문에 마땅히 받아야 할 환급금이나 연금 혜택을 놓치는 분들이 많습니다. 머니통은 공공기관 원본 법령과 공시 자료를 바탕으로 독창적인 시뮬레이션 계산기와 실무 적용 팁을 개발하여 금융 소비자의 권익을 보호합니다.
      </p>

      <h3>2. 공공데이터 공식 출처 및 데이터 산출 근거</h3>
      <p>머니통의 모든 아티클 및 계산기 알고리즘은 대한민국 공공기관의 공식 데이터베이스와 최신 법률 규정에 근거합니다:</p>
      <ul>
        <li><strong>세무 및 조세 정보:</strong> 국세청(NTS), 행정안전부 위택스(Wetax), 서울시 이택스(Etax), 기획재정부 세법 개정안</li>
        <li><strong>연금 및 복지 혜택:</strong> 보건복지부(MOHW), 복지로(Bokjiro), 국민연금공단(NPS), 공무원연금공단</li>
        <li><strong>건강보험 및 장기요양:</strong> 국민건강보험공단(NHIS), 노인장기요양보험 공식 포털</li>
        <li><strong>생활 공공요금 및 노동:</strong> 한국전력공사(KEPCO), 고용노동부(MOEL), 근로복지공단</li>
      </ul>

      <h3>3. 머니통 편집국의 3단계 팩트체크 프로세스</h3>
      <p>머니통은 정보의 정확성과 최신성을 유지하기 위해 엄격한 3단계 검증 시스템을 운영합니다:</p>
      <ol className="steps">
        <li><strong>1단계 (공식 법령·시행령 원문 대조):</strong> 최신 개정 법률 조항 및 공공기관 고시 공고문을 1:1 교차 대조합니다.</li>
        <li><strong>2단계 (자체 시뮬레이션 교차 검증):</strong> 구간별 세율, 소득인정액 공제, 감면율 산식을 자체 개발 알고리즘으로 시뮬레이션하여 오차를 0%로 검증합니다.</li>
        <li><strong>3단계 (실무 결격사유 점검):</strong> 단순 요약에 그치지 않고, 실제 신청 시 자주 발생하는 오류 사례와 예외 조건을 꼼꼼히 주석 처리합니다.</li>
      </ol>

      <h3>4. 회사 소개 및 운영 주체 (Company Information)</h3>
      <p>머니통은 데이터를 기반으로 금융 소비자의 문제를 해결하는 IT 솔루션 전문 기업 <strong>유니블솔루션(Unible Solution)</strong>에서 개발 및 운영하고 있습니다.</p>
      <ul>
        <li><strong>운영사명:</strong> 유니블솔루션 (Unible Solution)</li>
        <li><strong>대표자명:</strong> [대표자명]</li>
        <li><strong>사업자등록번호:</strong> [사업자등록번호]</li>
        <li><strong>주요 업무:</strong> 금융 데이터 분석 모델링, 시뮬레이션 알고리즘 개발, 세무/연금 최적화 플랫폼 운영</li>
        <li><strong>운영 철학:</strong> 저희는 단순한 트래픽 유발을 위한 자극적인 콘텐츠를 배제하고, 정확한 팩트와 수치 기반의 자체 개발 도구(계산기, 시뮬레이터)를 무료로 제공하여 독자들에게 실질적인 가치를 창출하는 것을 최우선 목표로 합니다.</li>
      </ul>

      <h3>5. 금융 및 투자 면책조항 (Financial Disclaimer)</h3>
      <div className="hero-card" style={{ padding: '1.5rem', marginTop: '1rem', marginBottom: '1.5rem', backgroundColor: '#fff9e6', border: '1px solid #ffeeba' }}>
        <p style={{ margin: 0, fontWeight: 600, color: '#856404' }}>[중요 고지사항]</p>
        <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: 0, color: '#856404', fontSize: '0.9rem' }}>
          <li>본 사이트에서 제공하는 모든 정보(정부지원금, 세무, 대출, 연금, 투자 분석 등)는 일반적인 정보 전달 및 학습을 목적으로 작성되었으며, 특정 금융 상품에 대한 권유나 전문적인 재무 자문이 아닙니다.</li>
          <li>본 사이트는 금융투자업 인가를 받은 기관이 아니며, 제공되는 정보의 정확성이나 완결성을 100% 보증하지 않습니다. 정책 및 금융기관의 상품 조건은 시점에 따라 수시로 변경될 수 있습니다.</li>
          <li>모든 금융 거래 및 세무 신고에 대한 최종 결정과 책임은 전적으로 이용자 본인에게 있으며, 실제 거래나 신청 시 반드시 해당 공공기관(홈택스 등) 또는 공인된 전문 상담사(세무사, 회계사, 금융기관 담당자)의 확인을 거치시기 바랍니다.</li>
        </ol>
      </div>

      <h3>6. 제휴 문의 및 정보 정정 요청</h3>
      <p>콘텐츠 정정 요청, 비즈니스 제휴, 광고 문의는 아래 공식 창구로 접수해 주시면 24시간 이내에 신속히 검토 후 회신드립니다.</p>
      
      <div className="hero-card" style={{ marginTop: '1.5rem', padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '1.15rem', fontWeight: 'bold' }}>📧 공식 고객센터 & 편집국 이메일: support@moneytong.com</p>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: 'var(--muted)' }}>운영시간: 평일 09:00 ~ 18:00 (공휴일 제외)</p>
      </div>
    </div>
  );
}
