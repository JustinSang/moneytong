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
            <span className="v2-live-text">실시간 업데이트</span>
          </div>
          <h1>
            당신이 놓치고 있는<br />
            <strong>돈이 되는 정보</strong>,<br />
            머니통이 찾아드립니다
          </h1>
          <p className="v2-hero-sub">
            머니통에서 정부지원금·환급금·알뜰쇼핑 정보를 한눈에 확인하세요.
          </p>

          {/* 정보 특성 지표 */}
          <div className="v2-stats-row">
            <div className="v2-stat">
              <span className="v2-stat-number">100%</span>
              <span className="v2-stat-label">검증 정보</span>
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

      {/* 5. 뉴스레터 구독 CTA */}
      <section className="v2-newsletter">
        <div className="v2-newsletter-inner">
          <h3>📬 매주 월요일, 돈 되는 정보를 무료로 보내드립니다</h3>
          <p>정부지원금 마감 알림, 방송상품 최저가 속보 등 꼭 알아야 할 핵심만 정리해 드려요.</p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
