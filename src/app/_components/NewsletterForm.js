'use client';

export default function NewsletterForm() {
  const handleBookmark = () => {
    alert('키보드의 Ctrl + D (Mac은 Cmd + D)를 누르시면 머니통을 브라우저 즐겨찾기에 등록하실 수 있습니다.');
  };

  return (
    <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
      <button
        onClick={handleBookmark}
        type="button"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '0.85rem 1.6rem',
          background: '#ffffff',
          color: '#1a1a3e',
          borderRadius: '30px',
          border: 'none',
          fontWeight: 700,
          fontSize: '0.95rem',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.15s ease'
        }}
      >
        ⭐ 머니통 즐겨찾기(북마크) 추가
      </button>
      <small style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem', display: 'block', marginTop: '0.6rem' }}>
        Ctrl+D (Mac은 Cmd+D)로 등록하고 필요할 때마다 확인하세요
      </small>
    </div>
  );
}
