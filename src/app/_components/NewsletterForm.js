'use client';
import { useState, useEffect } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | already
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('mt_subscribed') === 'true') {
        setStatus('already');
      }
    } catch (e) {
      // localStorage disabled fallback
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. 이메일 유효성 검사 (정규식)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMsg('올바른 이메일 주소를 입력해 주세요.');
      return;
    }

    // 2. 제출 상태 전환 (부드러운 UX)
    setStatus('submitting');

    setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('mt_subscribed', 'true');
          localStorage.setItem('mt_subscribed_email', email.trim());
        }
      } catch (e) {}
      setStatus('success');
    }, 450);
  };

  if (status === 'success' || status === 'already') {
    return (
      <div className="v2-nl-success-card" style={{
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        borderRadius: '16px',
        padding: '24px 20px',
        maxWidth: '480px',
        margin: '0 auto',
        textAlign: 'center',
        animation: 'fadeIn 0.4s ease-out'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎉</div>
        <h4 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 6px 0' }}>
          {status === 'already' ? '이미 머니통 소식을 구독 중입니다!' : '구독 신청이 완료되었습니다!'}
        </h4>
        <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
          매주 월요일 아침, 놓치면 아까운 정부지원금과 절세 정보를 정리해 전해드리겠습니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="v2-nl-form-wrapper" noValidate style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
      <div className="v2-nl-form" style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto 0.8rem',
        borderRadius: '30px',
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
      }}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMsg) setErrorMsg('');
          }}
          placeholder="이메일 주소 입력"
          aria-label="이메일 주소 입력"
          disabled={status === 'submitting'}
          required
          style={{
            flex: '1 1 auto',
            minWidth: 0,
            width: '100%',
            padding: '0.85rem 1.1rem',
            border: 'none',
            fontSize: '0.95rem',
            outline: 'none',
            background: 'transparent',
            color: '#1c1c1e'
          }}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            flex: '0 0 auto',
            whiteSpace: 'nowrap',
            padding: '0 1.4rem',
            background: '#1a1a3e',
            color: '#ffffff',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s'
          }}
        >
          {status === 'submitting' ? '신청 중...' : '무료 구독'}
        </button>
      </div>
      {errorMsg && (
        <p style={{ color: '#ffb4b4', fontSize: '0.85rem', margin: '8px 0 0 0', fontWeight: 500 }}>
          ⚠️ {errorMsg}
        </p>
      )}
      <small style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', display: 'block', marginTop: '0.4rem' }}>
        언제든 무료로 해지 가능합니다
      </small>
    </form>
  );
}
