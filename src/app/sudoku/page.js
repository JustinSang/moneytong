'use client';
import { useEffect } from 'react';

export default function SudokuRedirect() {
  useEffect(() => {
    window.location.href = 'https://sudoku-pwa-eqa.pages.dev';
  }, []);
  
  return (
    <div style={{ padding: '50px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2>스도쿠 게임으로 이동 중입니다...</h2>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        자동으로 이동하지 않으면 <a href="https://sudoku-pwa-eqa.pages.dev" style={{ color: '#0070f3', textDecoration: 'underline' }}>여기</a>를 클릭하세요.
      </p>
      <meta httpEquiv="refresh" content="1; url=https://sudoku-pwa-eqa.pages.dev" />
    </div>
  );
}
