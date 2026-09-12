export const metadata = {
  title: "해남 꿀고구마 파는 곳, 직거래 및 최저가 구매 가이드 | 머니통",
  description: "굽기만 해도 꿀이 뚝뚝 떨어지는 해남 프리미엄 꿀고구마. 해남 고구마 산지 직거래와 온라인 구매 팁, 당도 높이는 보관법을 한 번에 정리했습니다.",
  openGraph: {
    title: "해남 꿀고구마 파는 곳, 직거래 및 최저가 구매 가이드",
    description: "해남 꿀고구마, 가장 저렴하고 맛있게 사는 방법과 당도 높이는 보관 팁.",
    url: "https://moneytong.com/blog/sweet-potato-pilot",
    type: "article",
    images: [
      {
        url: "/images/og-sweet-potato.jpg",
        width: 1200,
        height: 630,
        alt: "해남 꿀고구마 구매 가이드",
      },
    ],
  },
};

export default function SweetPotatoPilotPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "해남 꿀고구마 파는 곳, 직거래 및 최저가 구매 가이드",
        datePublished: "2026-07-31T00:00:00.000Z",
        author: { "@type": "Organization", name: "머니통 편집부" },
        publisher: { "@type": "Organization", name: "머니통", url: "https://moneytong.com" }
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "해남 꿀고구마는 어디서 구매하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "해남 산지 직거래 농가 및 대형 쇼핑몰(쿠팡 로켓프레시 등)에서 온라인으로 편리하게 주문하실 수 있습니다."
            }
          },
          {
            "@type": "Question",
            name: "꿀고구마 당도를 높이는 보관법은 무엇인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "수령 후 냉장 보관을 피하고, 통풍이 잘 되는 서늘한 실내에 3~4일 숙성시키면 당도가 대폭 상승합니다."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <article className="post">
        <h1>해남 꿀고구마 파는 곳, 직거래 및 최저가 구매 가이드</h1>
        <p className="post-meta">2026-07-31 · 머니통 편집부</p>

        <div className="hero-card" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
          <span className="tag">제철 추천 먹거리</span>
          <p className="big">달콤한 꿀이 뚝뚝 떨어지는<br />해남 꿀고구마 구매 가이드</p>
          <p className="sub">산지 직송으로 가장 신선하고 알뜰하게 받아보세요.</p>
        </div>

        <p>겨울철 별미 군고구마나 가족 건강 간식을 찾을 때 <strong>"어디 고구마가 제일 달고 맛있지?"</strong> 고민하시는 분들 많으실 겁니다. 반으로 가르자마자 노란 꿀이 뚝뚝 떨어지는 해남 꿀고구마는 단연 인기 최고입니다.</p>
        <p>해남의 황토밭은 미네랄이 풍부하고 일조량이 많아 고구마 당도가 전국 최고 수준으로 유명합니다. 제철 시기에는 수요가 몰려 인기 규격은 빠르게 품절되기도 합니다.</p>
        
        <h2>어디서 살 수 있나요? (농장 직거래 vs 로켓배송)</h2>
        <p>구매 방법은 크게 두 가지입니다. 농장에 직접 전화해 택배를 받는 <strong>직거래 방식</strong>과, 이미 농장과 계약해 물량을 확보해 둔 <strong>대형 쇼핑몰(쿠팡 등)을 이용하는 방식</strong>입니다.</p>
        
        <table className="post-table">
          <thead><tr><th>구매 방법</th><th>장단점</th><th>추천 대상</th></tr></thead>
          <tbody>
            <tr><td><strong>산지 직거래</strong></td><td>가장 신선하지만, 현금 결제나 무통장 입금이 번거로울 수 있고 배송이 다소 느림.</td><td>시간적 여유가 있고 대량 구매를 원하시는 분</td></tr>
            <tr><td><strong>쿠팡 등 쇼핑몰</strong></td><td>카드 결제가 편하고 다음 날 바로 도착. 단, 인기 상품은 일찍 품절됨.</td><td>빠른 배송과 간편 결제를 원하시는 분</td></tr>
          </tbody>
        </table>

        <h2>구매처 안내 및 링크 연결 정보</h2>
        <p>직접 연락처를 찾아 헤매실 필요 없이, 해남 산지 직송 프리미엄 꿀고구마(특상 특등급) 중 <strong>현재 리뷰가 좋고 배송이 안정적인 상품</strong> 정보입니다.</p>
        
        <div className="bridge-box" style={{ borderColor: "#f5576c", background: "#fff5f7" }}>
          <h3 style={{ color: "#d63384" }}>🔥 꿀이 뚝뚝, 해남 프리미엄 꿀고구마 3kg/5kg</h3>
          <p>내일 바로 도착하는 추천 상품입니다. 하단 버튼을 클릭하시면 쿠팡 최저가 구매 페이지로 이동합니다.</p>
          <a href="https://link.coupang.com/a/fP2VbvZs3o" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: "inline-block", background: "#007bff", color: "white", padding: "12px 24px", borderRadius: "8px", fontWeight: "bold", textDecoration: "none", marginTop: "10px", boxShadow: "0 4px 6px rgba(0,123,255,0.2)" }}>👉 해남 프리미엄 꿀고구마 구매하기 (쿠팡)</a>
        </div>

        <h2>맛있게 굽는 꿀팁 3가지</h2>
        <ol className="steps" style={{ marginTop: "20px" }}>
          <li><strong>숙성 필수:</strong> 받자마자 드시기보다, 통풍이 잘 되는 서늘한 곳에 3~4일 두면 수분이 날아가며 당도가 훨씬 올라갑니다.</li>
          <li><strong>에어프라이어 200도:</strong> 군고구마의 꿀을 100% 끌어내려면 에어프라이어 200도에서 30분, 뒤집어서 20분 더 구워주세요.</li>
          <li><strong>신문지 보관:</strong> 남은 고구마는 냉장고에 넣지 마세요! 냉해를 입어 금방 썩습니다. 상자에 신문지를 깔고 서늘한 실내에 보관하는 것이 정석입니다.</li>
        </ol>

        <h2>결론</h2>
        <p>제철 해남 꿀고구마는 온 가족이 함께 즐기기에 안성맞춤인 건강 간식입니다. 올바른 보관법과 구이 팁을 참고하여 맛있는 해남 꿀고구마를 즐겨보세요!</p>

        <div className="eeat-byline">
          <strong>ℹ️ 알림</strong><br/>
          본 포스팅은 해남 꿀고구마 정보 및 구매 팁을 바탕으로 머니통(MoneyTong) 편집부에서 정보 제공 목적으로 작성하였습니다. 파트너스 활동을 통해 향후 일정액의 수수료를 제공받을 수 있습니다.
        </div>
      </article>
    </>
  );
}

