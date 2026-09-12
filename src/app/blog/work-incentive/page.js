export const metadata = {
  title: "2026 근로장려금, 최대 330만원 나도 대상일까? 조건·지급일·신청법 3분 정리 | 머니통",
  description: "2026 근로장려금 조건(소득·재산 기준), 가구별 최대 지급액(단독 165·홑벌이 285·맞벌이 330만원), 신청기간, 홈택스·손택스 신청법을 3분 안에 정리했습니다. 30초 자가진단으로 대상 여부부터 확인하세요.",
  openGraph: {
    title: "2026 근로장려금, 최대 330만원 나도 대상일까? 조건·지급일·신청법 3분 정리",
    description: "30초 자가진단으로 대상 여부부터 확인. 소득·재산 조건, 가구별 최대 지급액, 신청기간·신청법까지 한 장에 정리.",
    url: "https://moneytong.com/blog/work-incentive",
    type: "article",
    images: [
      {
        url: "/images/og-moneytong.jpg",
        width: 1200,
        height: 630,
        alt: "2026 근로장려금 최대 330만원 3분 정리",
      },
    ],
  },
};

export default function WorkIncentivePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "2026 근로장려금, 최대 330만원 나도 대상일까? 조건·지급일·신청법 3분 정리",
    datePublished: "2026-07-29T00:00:00.000Z",
    author: { "@type": "Organization", name: "머니통 편집부" },
    publisher: { "@type": "Organization", name: "머니통", url: "https://moneytong.com" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "아르바이트생도 근로장려금을 받을 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 가능합니다. 근로장려금은 정규직 여부가 아니라 '근로·사업·종교인 소득'과 소득·재산 기준으로 판단합니다. 아르바이트로 번 소득도 근로소득에 포함되므로, 소득 기준(단독 2,200만원 미만 등)과 재산 기준(2억4천만원 미만)을 충족하면 대상이 될 수 있습니다."
        }
      },
      {
        "@type": "Question",
        name: "재산 기준을 조금 넘으면 아예 못 받나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "재산이 1억7천만원 이상 2억4천만원 미만이면 산정된 장려금의 50%만 지급되고, 2억4천만원 이상이면 지급 대상에서 제외됩니다. 즉 재산 기준을 넘으면 받지 못하지만, 그 직전 구간은 절반이라도 받을 수 있습니다. 정확한 재산 산정은 홈택스에서 확인하세요."
        }
      },
      {
        "@type": "Question",
        name: "신청 안내문을 못 받았는데 신청할 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네. 국세청이 보내는 안내문(모바일·우편)을 받지 못했더라도, 본인이 대상이라고 판단되면 홈택스·손택스에서 직접 신청할 수 있습니다. 정기 신청기간(5월)을 놓쳤다면 기한 후 신청도 가능하나, 이 경우 지급액의 5~10%가 감액될 수 있습니다."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="post">
        <h1>2026 근로장려금, 최대 330만원 나도 대상일까? 조건·지급일·신청법 3분 정리</h1>
        <p className="post-meta">2026-07-29 · 머니통 편집부</p>

        <div className="hero-card">
          <span className="tag">2026 근로장려금</span>
          <p className="big">일하는 당신에게 국가가 주는<br /><em>최대 330만원</em>, 놓치면 사라집니다</p>
          <p className="sub">소득·재산 조건만 맞으면 신청 가능 · 30초 자가진단부터 시작하세요</p>
        </div>

        <p>작년에 제 어머니가 &quot;일하는데 나라에서 돈 준다는 문자가 왔는데 이거 사기냐&quot;고 물어보셨습니다. 확인해 보니 진짜 근로장려금 안내였고, 그날 저녁 손택스 앱으로 5분 만에 신청해 드렸더니 몇 달 뒤 통장에 실제로 입금됐습니다. 문제는, 이 돈을 <strong>몰라서 혹은 사기인 줄 알고</strong> 그냥 넘기는 분이 정말 많다는 겁니다.</p>
        <p>근로장려금은 &apos;일은 하지만 소득이 적은 가구&apos;에게 국가가 현금을 지원하는 제도입니다. 이 글 하나면 <strong>내가 대상인지, 얼마를 받는지, 언제 어떻게 신청하는지</strong>까지 3분 안에 끝납니다. 먼저 대상 여부부터 30초로 확인해 보세요.</p>

        <div className="self-check">
          <h3>⏱️ 30초 자가진단 — 나는 근로장려금 대상일까?</h3>
          <p className="lead">아래 3가지를 모두 만족하면 신청 대상일 가능성이 높습니다.</p>
          <ul>
            <li>일해서 번 소득이 있다 (근로·사업·종교인 소득 — 아르바이트 포함)</li>
            <li>가구 연 소득이 기준 미만이다 (단독 2,200 / 홑벌이 3,200 / 맞벌이 4,400만원)</li>
            <li>가구 재산 합계가 2억 4천만원 미만이다 (집·전세보증금·자동차 등 포함)</li>
          </ul>
          <p className="verdict">→ 셋 다 &apos;예&apos;라면, 아래 신청법으로 5분만 투자해 신청하세요. 애매해도 홈택스에서 &apos;심사&apos;로 확인하면 됩니다.</p>
        </div>

        <h2>근로장려금이 대체 뭔가요?</h2>
        <p><strong>일은 하지만 소득이 적어 생활이 빠듯한 가구에, 국가가 세금이 아니라 오히려 현금을 지원해 주는 제도입니다.</strong> 세금을 &apos;내는&apos; 게 아니라 &apos;돌려받는&apos; 쪽에 가깝다고 보면 됩니다.</p>
        <p>쉽게 말하면 이렇습니다. 열심히 일하는데도 벌이가 적으면, 그 노력을 응원한다는 취지로 나라가 <strong>1년에 한 번 목돈을 얹어주는 &apos;근로 보너스&apos;</strong>입니다. 자녀가 있으면 자녀장려금까지 함께 받을 수 있습니다.</p>

        <h2>누가 받을 수 있나요? — 소득·재산 조건</h2>
        <p><strong>핵심은 딱 두 가지, &apos;가구 유형별 소득 기준&apos;과 &apos;재산 2억 4천만원 미만&apos;입니다.</strong> 이 둘을 넘지 않으면 신청 대상입니다.</p>
        <table className="post-table">
          <thead><tr><th>가구 유형</th><th>연 소득 기준</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><strong>단독 가구</strong></td><td>2,200만원 미만</td><td>배우자·부양자녀·70세 이상 부모 없음</td></tr>
            <tr><td><strong>홑벌이 가구</strong></td><td>3,200만원 미만</td><td>배우자 또는 부양가족이 있고 혼자 버는 경우</td></tr>
            <tr><td><strong>맞벌이 가구</strong></td><td>4,400만원 미만</td><td>부부 모두 소득이 있는 경우</td></tr>
          </tbody>
        </table>
        <p><strong>재산 요건</strong>은 가구원 전체 재산 합계가 <strong>2억 4천만원 미만</strong>이어야 합니다. 이때 주택·전세보증금·토지·자동차·예금 등이 모두 합산됩니다. 참고로 재산이 1억 7천만원 이상이면 장려금이 <strong>50%만</strong> 지급됩니다.</p>
        <p className="note-inline">※ 소득·재산 기준은 국세청이 매년 고시하며 위 수치는 2026년 기준입니다. 본인 소득·재산의 정확한 산정 결과는 홈택스에서 확인하세요.</p>

        <h2>얼마나 받을 수 있나요? — 가구별 최대 지급액</h2>
        <p><strong>가구 유형에 따라 최대 165만원부터 330만원까지 받습니다.</strong> 소득이 특정 구간일 때 최대치에 가까워지고, 그보다 많거나 적으면 점차 줄어드는 구조입니다.</p>
        <div className="pay-bars">
          <div className="pay-row single"><span className="label">단독</span><div className="bar">최대 165만원</div></div>
          <div className="pay-row one"><span className="label">홑벌이</span><div className="bar">최대 285만원</div></div>
          <div className="pay-row dual"><span className="label">맞벌이</span><div className="bar">최대 330만원</div></div>
        </div>
        <p>즉 흔히 광고에서 보는 &apos;최대 330만원&apos;은 <strong>맞벌이 가구 기준</strong>입니다. 내 정확한 예상 지급액은 홈택스·손택스의 &apos;근로장려금 미리보기(계산기)&apos;에서 몇 가지만 입력하면 바로 확인할 수 있습니다.</p>

        <h2>언제 신청하나요? — 반기·정기·기한 후 일정</h2>
        <p><strong>근로소득만 있는 분은 3월(반기)과 5월(정기) 중 편한 때를 고르면 되고, 사업·종교인 소득이 있으면 5월 정기 신청을 이용합니다.</strong></p>
        <ul className="timeline">
          <li><b>상반기 반기신청</b> — 2026년 3월 (근로소득자) · 지급: 그해 6월 말경</li>
          <li><b>정기신청</b> — 2026년 5월 1일 ~ 6월 1일 (모든 대상) · 지급: 그해 8~9월경</li>
          <li><b>하반기 반기신청</b> — 2026년 9월 (근로소득자) · 지급: 이듬해 초</li>
          <li><b>기한 후 신청</b> — 정기 신청기간을 놓쳤을 때 (지급액 5~10% 감액될 수 있음)</li>
        </ul>
        <p className="note-inline">※ 정확한 신청·지급일은 매년 국세청 일정에 따라 달라지므로, 신청 전 홈택스 공지를 확인하세요.</p>

        <h2>어떻게 신청하나요? — 홈택스·손택스 3단계</h2>
        <p><strong>스마트폰 손택스 앱이 가장 빠르고, 컴퓨터로는 홈택스, 전화(ARS)로도 됩니다.</strong> 안내문에 있는 &apos;개별인증번호&apos;가 있으면 1분 만에 끝납니다.</p>
        <ol className="steps">
          <li><strong>손택스 앱 실행</strong> 후 로그인(간편·공동인증). 컴퓨터는 홈택스(hometax.go.kr) 접속.</li>
          <li>메인에서 <strong>[장려금·연말정산·전자기부금] → [근로·자녀장려금 신청]</strong> 선택.</li>
          <li>안내문의 <strong>개별인증번호</strong> 입력(또는 직접 신청) → 연락처·<strong>본인 계좌</strong> 확인 후 신청 완료.</li>
        </ol>
        <p>부모님처럼 스마트폰 인증이 어려운 분은 국세청 <strong>ARS ☎1544-9944</strong>로 개별인증번호만 있으면 전화로도 신청됩니다. 제가 어머니 것을 신청해 드릴 때도 이 방법이 제일 편했습니다.</p>

        <h2>소득·재산 기준을 넘어 탈락했다면?</h2>
        <p><strong>근로장려금 대상이 아니어도, 낮은 소득 구간에서 챙길 수 있는 다른 지원과 절약 방법은 많습니다.</strong> 여기서 포기하지 말고 방향만 바꾸면 됩니다.</p>
        <p>대표적으로 자녀장려금, 국민취업지원제도, 지자체별 청년·중장년 지원금 등은 근로장려금과 조건이 다릅니다. 또한 매달 새는 고정지출부터 점검하면 장려금 못지않은 돈이 남습니다. 저도 어머니 가계부를 무료 앱으로 정리해 드렸더니, 안 쓰던 구독료와 통신 요금에서 매달 몇 만원이 그냥 빠져나가고 있었습니다.</p>
        <p>정부지원금 통합조회와 가계부·고정지출 점검부터 시작해 보세요. 아래에서 무료로 확인할 수 있는 도구를 정리해 두었습니다.</p>
        <div className="bridge-box">
          <p>📌 <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer">국세청 홈택스</a>에서 근로장려금 신청 여부를 직접 확인하실 수 있습니다.</p>
        </div>

        <h2>자주 묻는 질문 (FAQ)</h2>
        <p><strong>Q1. 아르바이트생도 근로장려금을 받을 수 있나요?</strong><br/>
        A1. 네, 가능합니다. 정규직 여부가 아니라 &apos;소득 종류(근로·사업·종교인)&apos;와 소득·재산 기준으로 판단합니다. 아르바이트 소득도 근로소득이므로, 소득·재산 기준만 충족하면 대상이 될 수 있습니다.</p>
        <p><strong>Q2. 재산 기준을 조금 넘으면 아예 못 받나요?</strong><br/>
        A2. 재산이 1억 7천만원 이상 2억 4천만원 미만이면 산정된 장려금의 50%만 지급되고, 2억 4천만원 이상이면 제외됩니다. 즉 직전 구간은 절반이라도 받을 수 있습니다.</p>
        <p><strong>Q3. 신청 안내문을 못 받았는데 신청할 수 있나요?</strong><br/>
        A3. 네. 안내문(모바일·우편)을 못 받았어도 본인이 대상이면 홈택스·손택스에서 직접 신청할 수 있습니다. 정기 기간을 놓쳤다면 기한 후 신청도 가능하나 5~10% 감액될 수 있습니다.</p>

        <h2>결론 — 오늘 30초 자가진단부터</h2>
        <p>근로장려금은 &apos;특별히 운 좋은 사람&apos;이 받는 게 아니라, <strong>조건만 맞으면 누구나 신청할 수 있는 내 권리</strong>입니다. 일하고 있고 소득·재산 기준 안에 든다면, 오늘 5분만 투자해 신청하세요.</p>
        <p>특히 부모님·주변 어르신은 이 제도를 모르거나 사기 문자로 오해해 놓치는 경우가 많습니다. 이 글을 공유해 함께 확인해 보시길 권합니다.</p>

        <div className="bridge-box">
          <h3>💡 이 글을 저장해 두세요</h3>
          <p>근로장려금은 신청 시기(3·5·9월)가 정해져 있습니다. 지금이 신청기간이 아니더라도, 이 글을 저장해 두면 다음 신청기에 조건·신청법을 다시 찾을 필요가 없습니다.</p>
        </div>

        <div className="eeat-byline">
          <strong>ℹ️ 이 글은 이렇게 작성됐습니다</strong>
          이 글은 머니통(MoneyTong) 편집부가 국세청·홈택스 등 공공기관 공개자료를 바탕으로 조사·작성 및 전문 검수했습니다. 소득·재산 기준과 지급액·신청일은 매년 바뀔 수 있으니, 본인의 정확한 대상 여부·금액·일정은 반드시 <strong>홈택스(hometax.go.kr)</strong> 또는 국세청 상담센터(☎126)에서 확인하시기 바랍니다.
        </div>
      </article>
    </>
  );
}
