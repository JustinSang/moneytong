'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { CATEGORIES, EXTERNAL_LINKS, ALL_POSTS } from '../_data/site';

// 홈 탐색 섹션 — 카테고리 타일(현재) + 필터칩 + 카드그리드를 하나로 통합.
// 카테고리 타일 클릭 → 해당 필터 적용 + 그리드로 부드럽게 스크롤(주제별로 골라 보는 UX).
export default function BrowseSection() {
  const [filter, setFilter] = useState('all');
  const gridRef = useRef(null);

  const pickCategory = (id) => {
    setFilter(id);
    // 그리드로 스크롤(모바일에서 타일 → 결과가 화면 밖일 때 특히 유용)
    requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const posts = filter === 'all' ? ALL_POSTS : ALL_POSTS.filter((p) => p.catId === filter);

  return (
    <>
      {/* 카테고리 타일 — 현재 5 + 무료 서비스 */}
      <section className="mt-cats">
        <div className="mt-section-head">
          <h2>카테고리</h2>
          <p>필요한 주제를 골라 바로 확인하세요.</p>
        </div>

        <div className="mt-cat-grid">
          {CATEGORIES.map((c) => (
            <button key={c.id} className="mt-cat-tile" onClick={() => pickCategory(c.id)}>
              <span className="mt-cat-ic" style={{ background: c.gradient }}>{c.icon}</span>
              <span className="mt-cat-name">{c.label}</span>
              <span className="mt-cat-blurb">{c.blurb}</span>
              <span className="mt-cat-num">{c.posts.length}개 글</span>
            </button>
          ))}

          {EXTERNAL_LINKS.map((x) => (
            <a
              key={x.href}
              href={x.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-cat-tile mt-cat-ext"
            >
              <span className="mt-cat-ic" style={{ background: 'linear-gradient(135deg, #f1c40f, #e67e22)' }}>{x.icon}</span>
              <span className="mt-cat-name">{x.label}</span>
              <span className="mt-cat-blurb">{x.blurb}</span>
              <span className="mt-cat-num mt-cat-free">무료 서비스 ↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* 필터칩 + 카드 그리드 */}
      <section className="mt-explorer" ref={gridRef}>
        <div className="mt-section-head">
          <h2>전체 콘텐츠</h2>
          <p>주제 필터로 원하는 정보만 빠르게 찾아보세요.</p>
        </div>

        <div className="mt-filter-row">
          <button
            className={`mt-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            전체 <span className="mt-chip-count">{ALL_POSTS.length}</span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`mt-chip ${filter === c.id ? 'active' : ''}`}
              onClick={() => setFilter(c.id)}
            >
              <span className="mt-chip-emoji">{c.icon}</span>
              {c.label} <span className="mt-chip-count">{c.posts.length}</span>
            </button>
          ))}
        </div>

        <div className="mt-card-grid">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className={`mt-card ${p.color}`}>
              <div className="mt-card-top">
                <span className="mt-card-cat">{p.cat}</span>
                {p.calc && <span className="mt-card-calc">계산기</span>}
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span className="mt-card-more">자세히 보기 <span aria-hidden>→</span></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
