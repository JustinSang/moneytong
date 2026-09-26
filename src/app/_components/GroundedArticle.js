// 그라운딩 글 재사용 템플릿 — 구조화된 article model을 받아 moneytong 비주얼 카드로 렌더.
// 사실 비주얼(self-check/steps/timeline/bars/table)의 데이터는 반드시 grounded_facts에서 옴.
// 데이터 없는 비주얼은 이 컴포넌트가 렌더하지 않음(사실 없으면 생략 = 그라운딩 원칙의 비주얼 확장).
// 확정 포맷(2026-08-07): A뼈대(요약/자가진단/바/스텝) + B킬러요소(계산기·변경점요약·부정수급경고·관련글카드).
import Calculator from './Calculator';
import AcqTaxCalculator from './AcqTaxCalculator';
import PropTaxCalculator from './PropTaxCalculator';
import CarTaxCalculator from './CarTaxCalculator';
import LoanCalculator from './LoanCalculator';
import InterestCalculator from './InterestCalculator';
import SeveranceCalculator from './SeveranceCalculator';
import SalaryCalculator from './SalaryCalculator';
import ElectricityCalculator from './ElectricityCalculator';
import ContractPowerCalculator from './ContractPowerCalculator';
import EvChargingCalculator from './EvChargingCalculator';
import PodcastPlayer from './PodcastPlayer';

function Visual({ visual }) {
  if (!visual || !visual.type) return null;
  switch (visual.type) {
    case 'self-check':
      if (!visual.items || visual.items.length === 0) return null;
      return (
        <div className="self-check">
          {visual.heading && <h3>{visual.heading}</h3>}
          {visual.lead && <p className="lead">{visual.lead}</p>}
          <ul>{visual.items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}</ul>
          {visual.verdict && <p className="verdict">{visual.verdict}</p>}
        </div>
      );
    case 'steps':
      if (!visual.steps || visual.steps.length === 0) return null;
      return <ol className="steps">{visual.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: s }} />)}</ol>;
    case 'timeline':
      if (!visual.items || visual.items.length === 0) return null;
      return <ul className="timeline">{visual.items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}</ul>;
    case 'bars':
      if (!visual.rows || visual.rows.length === 0) return null;
      return (
        <div className="pay-bars">
          {visual.rows.map((r, i) => (
            <div className="pay-row" key={i}>
              <span className="label">{r.label}</span>
              <div className="bar" style={{ width: r.width || '100%' }}>{r.value}</div>
            </div>
          ))}
        </div>
      );
    case 'summary':
      if (!visual.items || visual.items.length === 0) return null;
      return (
        <div className="key-summary">
          <strong>{visual.heading || '📌 3줄 핵심 요약'}</strong>
          <ul>{visual.items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}</ul>
        </div>
      );
    case 'calculator':
      if (!visual.config) return null;
      return <Calculator config={visual.config} />;
    case 'acqTaxCalc':
      return <AcqTaxCalculator />;
    case 'propTaxCalc':
      return <PropTaxCalculator />;
    case 'carTaxCalc':
      return <CarTaxCalculator />;
    case 'loanCalc':
      return <LoanCalculator />;
    case 'interestCalc':
      return <InterestCalculator />;
    case 'severanceCalc':
      return <SeveranceCalculator />;
    case 'salaryCalc':
      return <SalaryCalculator />;
    case 'electricityCalc':
      return <ElectricityCalculator />;
    case 'contractPowerCalc':
      return <ContractPowerCalculator />;
    case 'evChargingCalc':
      return <EvChargingCalculator />;
    case 'related':
      if (!visual.items || visual.items.length === 0) return null;
      return (
        <div className="rel-cards">
          {visual.items.map((it, i) => (
            it.href
              ? <a className="rel-card" key={i} href={it.href}>{it.label}</a>
              : <div className="rel-card" key={i}>{it.label}</div>
          ))}
        </div>
      );
    case 'cards':
      if (!visual.cards || visual.cards.length === 0) return null;
      return (
        <div className="info-cards">
          {visual.cards.map((c, i) => (
            <div className="info-card" key={i}>
              {c.icon && <span className="ic">{c.icon}</span>}
              <strong>{c.title}</strong>
              {c.body && <span>{c.body}</span>}
            </div>
          ))}
        </div>
      );
    case 'callout':
      if (!visual.body) return null;
      return (
        <div className={`callout${visual.tone ? ' ' + visual.tone : ''}`}>
          {visual.icon && <span className="ic">{visual.icon}</span>}
          <div dangerouslySetInnerHTML={{ __html: visual.body }} />
        </div>
      );
    case 'table':
      if (!visual.rows || visual.rows.length === 0) return null;
      return (
        <table className="post-table">
          {visual.head && <thead><tr>{visual.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>}
          <tbody>{visual.rows.map((row, i) => <tr key={i}>{row.map((c, j) => <td key={j} dangerouslySetInnerHTML={{ __html: c }} />)}</tr>)}</tbody>
        </table>
      );
    case 'infographic':
      if (!visual.src) return null;
      return (
        <div className="infographic-container">
          <img src={visual.src} alt={visual.alt || '인포그래픽'} className="infographic-img" loading="lazy" />
          {visual.caption && (
            <p className="infographic-caption">
              {visual.caption}
            </p>
          )}
        </div>
      );
    case 'cardnews':
      if (!visual.cards || visual.cards.length === 0) return null;
      return (
        <div className="cardnews-section">
          <div className="cardnews-header">
            <span className="cardnews-badge">
              {visual.badge || '핵심 요약'}
            </span>
            <h3 className="cardnews-heading">{visual.heading || '주요 핵심 내용 정리'}</h3>
            {visual.lead && <p className="cardnews-lead">{visual.lead}</p>}
          </div>
          <div className="cardnews-grid">
            {visual.cards.map((card, idx) => (
              <div key={idx} className="cardnews-card">
                <img src={card.src} alt={card.alt || `카드 ${idx + 1}`} className="cardnews-card-img" loading="lazy" />
                {card.title && (
                  <div className="cardnews-card-body">
                    <strong className="cardnews-card-title">{card.title}</strong>
                    {card.desc && <p className="cardnews-card-desc">{card.desc}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

// 읽기 시간 추정 (한국어 평균 500자/분 기준)
function estimateReadingTime(model) {
  let text = (model.title || '') + (model.intro || '');
  (model.sections || []).forEach(s => { text += (s.h2 || '') + (s.prose || ''); });
  (model.faq || []).forEach(f => { text += f.q + f.a; });
  const charCount = text.replace(/\s/g, '').length;
  return Math.max(3, Math.ceil(charCount / 500));
}

// 자동 목차 생성 (가이드형 글에만 표시)
function TableOfContents({ sections }) {
  if (!sections || sections.length < 3) return null;
  return (
    <nav className="toc-nav" aria-label="목차">
      <strong className="toc-title">📑 목차</strong>
      <ol className="toc-list">
        {sections.map((sec, i) => (
          <li key={i}><a href={`#section-${i}`}>{sec.h2}</a></li>
        ))}
      </ol>
    </nav>
  );
}

// 계산기형 글: 계산기를 먼저, 설명을 뒤에 배치
function CalculatorLayout({ m, readMin }) {
  // 계산기가 들어있는 섹션을 찾아 분리
  const calcSections = (m.sections || []).filter(s => s.visual && /[Cc]alc$/.test(s.visual.type));
  const textSections = (m.sections || []).filter(s => !s.visual || !/[Cc]alc$/.test(s.visual.type));

  return (
    <>
      <h1>{m.title}</h1>
      <div className="post-meta-row">
        {m.postMeta && <span className="post-meta">{m.postMeta}</span>}
        <span className="reading-time">⏱ 읽기 {readMin}분</span>
      </div>

      {m.hero && (
        <div className="hero-card hero-card--calc">
          {m.hero.tag && <span className="tag">{m.hero.tag}</span>}
          {m.hero.big && <p className="big" dangerouslySetInnerHTML={{ __html: m.hero.big }} />}
          {m.hero.sub && <p className="sub">{m.hero.sub}</p>}
        </div>
      )}

      {/* 계산기를 먼저 렌더 */}
      {calcSections.map((sec, i) => (
        <section key={`calc-${i}`} id={`section-calc-${i}`} className="calc-hero-section">
          <h2>{sec.h2}</h2>
          {sec.prose && sec.prose.split('\n\n').map((p, j) => <p key={j}>{p}</p>)}
          <Visual visual={sec.visual} />
          {sec.note && <p className="note-inline">{sec.note}</p>}
        </section>
      ))}

      {m.summary && <Visual visual={{ type: 'summary', ...m.summary }} />}

      {m.intro && m.intro.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}

      {m.heroImage && (
        <img className="hero-illust" src={m.heroImage} alt={m.heroImageAlt || m.title} width="1376" height="768" loading="lazy" />
      )}

      {/* 설명 섹션 */}
      {textSections.map((sec, i) => (
        <section key={`text-${i}`} id={`section-${i}`}>
          <h2>{sec.h2}</h2>
          {sec.prose && sec.prose.split('\n\n').map((p, j) => <p key={j}>{p}</p>)}
          <Visual visual={sec.visual} />
          {sec.note && <p className="note-inline">{sec.note}</p>}
        </section>
      ))}
    </>
  );
}

// 가이드형 글: 목차 + 풍부한 본문 구조
function GuideLayout({ m, readMin }) {
  return (
    <>
      <h1>{m.title}</h1>
      <div className="post-meta-row">
        {m.postMeta && <span className="post-meta">{m.postMeta}</span>}
        <span className="reading-time">⏱ 읽기 {readMin}분</span>
        {m.lastModified && <span className="last-updated">📅 최종 업데이트: {m.lastModified}</span>}
      </div>

      {m.heroImage && (
        <img className="hero-illust" src={m.heroImage} alt={m.heroImageAlt || m.title} width="1376" height="768" />
      )}

      {m.hero && (
        <div className="hero-card">
          {m.hero.tag && <span className="tag">{m.hero.tag}</span>}
          {m.hero.big && <p className="big" dangerouslySetInnerHTML={{ __html: m.hero.big }} />}
          {m.hero.sub && <p className="sub">{m.hero.sub}</p>}
        </div>
      )}

      {m.summary && <Visual visual={{ type: 'summary', ...m.summary }} />}

      <TableOfContents sections={m.sections} />

      {m.podcast && <PodcastPlayer {...m.podcast} />}

      {m.cardnews && <Visual visual={{ type: 'cardnews', ...m.cardnews }} />}

      {m.intro && m.intro.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}

      {(m.sections || []).map((sec, i) => (
        <section key={i} id={`section-${i}`}>
          <h2>{sec.h2}</h2>
          {sec.prose && sec.prose.split('\n\n').map((p, j) => <p key={j}>{p}</p>)}
          <Visual visual={sec.visual} />
          {sec.note && <p className="note-inline">{sec.note}</p>}
        </section>
      ))}
    </>
  );
}

// 비교형 글: 비교 테이블/카드를 강조, 히어로 없이 깔끔한 구조
function ComparisonLayout({ m, readMin }) {
  return (
    <>
      <h1>{m.title}</h1>
      <div className="post-meta-row">
        {m.postMeta && <span className="post-meta">{m.postMeta}</span>}
        <span className="reading-time">⏱ 읽기 {readMin}분</span>
      </div>

      {m.summary && <Visual visual={{ type: 'summary', ...m.summary }} />}

      {m.heroImage && (
        <img className="hero-illust" src={m.heroImage} alt={m.heroImageAlt || m.title} width="1376" height="768" />
      )}

      {m.intro && m.intro.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}

      {m.podcast && <PodcastPlayer {...m.podcast} />}

      {(m.sections || []).map((sec, i) => (
        <section key={i} id={`section-${i}`}>
          <h2>{sec.h2}</h2>
          {sec.prose && sec.prose.split('\n\n').map((p, j) => <p key={j}>{p}</p>)}
          <Visual visual={sec.visual} />
          {sec.note && <p className="note-inline">{sec.note}</p>}
        </section>
      ))}
    </>
  );
}

export default function GroundedArticle({ model }) {
  const m = model || {};
  const articleType = m.articleType || 'guide';
  const readMin = estimateReadingTime(m);

  const publishedDate = m.postMeta ? m.postMeta.split(' · ')[0] + "T00:00:00.000Z" : "2026-08-01T00:00:00.000Z";
  const modifiedDate = m.lastModified ? m.lastModified + "T00:00:00.000Z" : publishedDate;

  // Schema.org Article — dateModified 추가, publisher에 logo 추가
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: m.title,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: { 
      "@type": "Organization", 
      name: "머니통",
      url: "https://moneytong.com/contact",
      description: "머니통은 정부지원금, 세무, 대출, 연금 등 공공 금융 정보를 알기 쉽게 전달하는 금융 정보 가이드입니다."
    },
    publisher: {
      "@type": "Organization",
      name: "머니통",
      url: "https://moneytong.com",
      logo: { "@type": "ImageObject", url: "https://moneytong.com/favicon.svg" }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://moneytong.com/blog/${m.slug || ''}` }
  };

  const faqSchema = m.faq && m.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: m.faq.map(item => ({
      "@type": "Question",
      name: item.q.replace(/^Q\d+\.\s*/, ''),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://moneytong.com" },
      { "@type": "ListItem", position: 2, name: "블로그", item: "https://moneytong.com/blog" },
      { "@type": "ListItem", position: 3, name: m.title }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <article className={`post post--${articleType}`}>
        {/* 유형별 본문 레이아웃 분기 */}
        {articleType === 'calculator' && <CalculatorLayout m={m} readMin={readMin} />}
        {articleType === 'comparison' && <ComparisonLayout m={m} readMin={readMin} />}
        {articleType === 'guide' && <GuideLayout m={m} readMin={readMin} />}

        {/* 공통 하단 영역: FAQ, 관련글, 브릿지, 바이라인 */}
        {m.faq && m.faq.length > 0 && (
          <section className="faq-section">
            <h2>자주 묻는 질문 (FAQ)</h2>
            <dl className="faq-list">
              {m.faq.map((qa, i) => (
                <div key={i} className="faq-item">
                  <dt>{qa.q}</dt>
                  <dd>{qa.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {m.related && (
          <section>
            <h2>함께 보면 좋은 글</h2>
            <Visual visual={m.related.type ? m.related : { type: 'related', ...m.related }} />
          </section>
        )}

        {m.bridge && (
          <div className="bridge-box">
            {m.bridge.heading && <h3>{m.bridge.heading}</h3>}
            <p>{m.bridge.body}</p>
          </div>
        )}

        {m.byline && (
          <div className="eeat-byline">
            <strong>ℹ️ 안내 및 출처 고지</strong>
            {m.byline}
          </div>
        )}
      </article>
    </>
  );
}
