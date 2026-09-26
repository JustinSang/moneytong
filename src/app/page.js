import Link from "next/link";
import BrowseSection from "./_components/BrowseSection";
import NewsletterForm from "./_components/NewsletterForm";
import { TRENDING } from "./_data/site";

export default function HomeV2() {
  return (
    <div className="v2-container">
      {/* 1. 다크 프리미엄 히어로 */}
      <section className="v2-hero">
        <div className="v2-hero-inner">
          <div className="v2-badge-row">
            <span className="v2-live-dot"></span>
            <span className="v2-live-text">공식 데이터 기준 안내</span>
          </div>
          <h1>
            당신이 놓치고 있는<br />
            <strong>돈이 되는 정보</strong>,<br />
            머니통이 찾아드립니다
          </h1>
          <p className="v2-hero-sub">
            머니통에서 정부지원금·환급금·금융세제 정보를 한눈에 확인하세요.
          </p>

          {/* 정보 특성 지표 */}
          <div className="v2-stats-row">
            <div className="v2-stat">
              <span className="v2-stat-number">공식</span>
              <span className="v2-stat-label">공공데이터</span>
            </div>
            <div className="v2-stat-divider"></div>
            <div className="v2-stat">
              <span className="v2-stat-number">FREE</span>
              <span className="v2-stat-label">무료 공개</span>
            </div>
            <div className="v2-stat-divider"></div>
            <div className="v2-stat">
              <span className="v2-stat-number">3분</span>
              <span className="v2-stat-label">핵심 요약</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 인기 급상승 트렌딩 바 — 전부 실제 글로 연동 */}
      <section className="v2-trending">
        <div className="v2-trending-inner">
          <span className="v2-trending-label">🔥 지금 많이 보는</span>
          <div className="v2-trending-items">
            {TRENDING.map((t) => (
              <Link key={t.href} href={t.href} className="v2-trending-tag">
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3+4. 카테고리 타일 + 필터 탐색 그리드 */}
      <BrowseSection />

      {/* 5. 정보 알림 섹션 */}
      <section className="v2-newsletter">
        <div className="v2-newsletter-inner">
          <h3>📬 머니통 주요 금융·복지 가이드</h3>
          <p>정부지원금·연금·세제 혜택 등 놓치기 쉬운 금융 정보를 알기 쉽게 정리해 드립니다.</p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
