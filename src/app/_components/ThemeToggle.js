'use client';
import { useState, useEffect } from 'react';

// 3단계 테마 토글: 시스템 자동 → 라이트 → 다크 → (반복).
// 시스템=속성 제거(prefers-color-scheme 따름), 라이트/다크=html[data-theme] 강제 + localStorage 저장.
const ORDER = ['system', 'light', 'dark'];
const ICON = { system: '🖥️', light: '☀️', dark: '🌙' };
const LABEL = { system: '시스템', light: '라이트', dark: '다크' };

export default function ThemeToggle() {
  const [mode, setMode] = useState('system');

  // 마운트 시 저장된 선택 반영(실제 테마는 layout의 인라인 스크립트가 이미 적용해 깜빡임 없음)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mt-theme');
      if (saved === 'light' || saved === 'dark') setMode(saved);
    } catch (e) {}
  }, []);

  function apply(next) {
    setMode(next);
    try {
      if (next === 'system') {
        localStorage.removeItem('mt-theme');
        document.documentElement.removeAttribute('data-theme');
      } else {
        localStorage.setItem('mt-theme', next);
        document.documentElement.setAttribute('data-theme', next);
      }
    } catch (e) {}
  }

  function cycle() {
    apply(ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length]);
  }

  return (
    <button
      className="mt-theme-toggle"
      onClick={cycle}
      aria-label={`화면 테마: ${LABEL[mode]} (클릭하면 전환)`}
      title={`화면 테마: ${LABEL[mode]} · 클릭하면 전환`}
    >
      <span className="mt-theme-ic" aria-hidden>{ICON[mode]}</span>
      <span className="mt-theme-txt">{LABEL[mode]}</span>
    </button>
  );
}
