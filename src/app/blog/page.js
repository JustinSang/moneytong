import Link from 'next/link';
import { CATEGORIES } from '../_data/site';

export const metadata = {
  title: '블로그 — 정부지원금·세금·연금 가이드 총정리',
  description: '정부지원금, 세금 계산기, 연금 복지 등 생활 금융 정보를 카테고리별로 모아볼 수 있습니다. 머니통 편집부가 공식 자료를 기반으로 작성한 가이드와 무료 계산기를 확인하세요.',
};

export default function BlogIndexPage() {
  return (
    <div className="blog-index">
      <h1>머니통 블로그</h1>
      <p className="blog-index-desc">
        정부지원금, 세금, 연금, 보험 등 생활 금융의 핵심 정보를 카테고리별로 정리했습니다.<br />
        모든 글은 공식 법령과 공공기관 자료를 기반으로 머니통 편집부가 직접 작성·검증합니다.
      </p>

      {CATEGORIES.map((cat) => (
        <section key={cat.id} className="blog-cat-section">
          <div className="blog-cat-header">
            <span className="blog-cat-emoji">{cat.icon}</span>
            <h2>{cat.label}</h2>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted, #888)', marginBottom: '1rem' }}>
            {cat.blurb}
          </p>
          <div className="blog-post-grid">
            {cat.posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-post-card"
              >
                <h3>{post.title}</h3>
                <p className="blog-post-card-desc">{post.desc}</p>
                <div className="blog-post-card-meta">
                  <span>머니통 편집부</span>
                  {post.calc && <span className="blog-post-card-badge">계산기</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
