'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '../_data/site';
import ThemeToggle from './ThemeToggle';

// 카테고리별 드롭다운 메가메뉴 네비.
// 데스크톱: 마우스 hover로 열림. 모바일: 햄버거 → 카테고리 아코디언.
export default function SiteNav() {
  const [openId, setOpenId] = useState(null);   // 현재 열린 드롭다운 카테고리 id
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // 바깥 클릭 시 모두 닫기
  useEffect(() => {
    function onDocClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenId(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const closeAll = () => { setOpenId(null); setMobileOpen(false); };

  return (
    <nav className="mt-nav" ref={navRef}>
      <div className="mt-nav-bar">
        <Link href="/" className="logo" onClick={closeAll}>
          MONEY<small>TONG</small>
        </Link>

        <div className="mt-nav-right">
        <div className={`mt-nav-menu ${mobileOpen ? 'open' : ''}`}>
          <Link href="/" className="mt-nav-top" onClick={closeAll}>홈</Link>

          {CATEGORIES.map((cat) => {
            const open = openId === cat.id;
            return (
              <div
                key={cat.id}
                className={`mt-nav-item ${open ? 'open' : ''}`}
              >
                <button
                  className="mt-nav-top"
                  aria-expanded={open}
                  onClick={() => setOpenId((cur) => (cur === cat.id ? null : cat.id))}
                >
                  <span className="mt-nav-emoji">{cat.icon}</span>
                  {cat.label}
                  <span className="mt-nav-caret" aria-hidden>▾</span>
                </button>

                <div className="mt-dropdown">
                  <div className="mt-dropdown-inner">
                    <span className="mt-dropdown-head" style={{ color: 'var(--primary)' }}>
                      {cat.label} · {cat.blurb}
                    </span>
                    {cat.posts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="mt-dropdown-link"
                        onClick={closeAll}
                      >
                        <span className="mt-dropdown-title">
                          {p.calc && <span className="mt-dropdown-badge">계산기</span>}
                          {p.title}
                        </span>
                        <span className="mt-dropdown-desc">{p.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

          <ThemeToggle />

          <button
            className="mt-nav-burger"
            aria-label="메뉴 열기"
            aria-expanded={mobileOpen}
            onClick={() => { setMobileOpen((v) => !v); setOpenId(null); }}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
