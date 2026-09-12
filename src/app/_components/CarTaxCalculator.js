'use client';
import { useState } from 'react';

// 비영업용 승용차 자동차세(소유분) 계산기 — 상수는 전부 grounded(지방세법).
//  · cc당 세액: 1000cc↓ 80원 / 1600cc↓ 140원 / 1600cc↑ 200원  (배기량 전체 × 해당 단가, 누진 아님)
//  · 차령 경감: 3년차부터 매년 5%p, 최대 50%(12년↑)  →  경감율 = min(50%, 5%×(차령−2))
//  · 지방교육세 = 자동차세(차령경감 후)의 30%   ·   연납(1월) 시 자동차세분 약 5% 공제
// 검산: 2000cc·차령0 → 2000×200=400,000 + 지방교육세 120,000 = 520,000원(공식 예시와 일치).
export default function CarTaxCalculator() {
  const [cc, setCc] = useState('');
  const [age, setAge] = useState('');
  const [out, setOut] = useState(null);

  function run() {
    const disp = parseInt(cc || '0', 10);
    if (!disp) { setOut({ msg: '배기량(cc)을 입력해 주세요.' }); return; }
    const age0 = parseInt(age || '0', 10) || 0;
    const perCc = disp <= 1000 ? 80 : disp <= 1600 ? 140 : 200;
    const gross = disp * perCc;                                   // 경감 전 자동차세
    const reduceRate = age0 < 3 ? 0 : Math.min(0.5, 0.05 * (age0 - 2));
    const carTax = Math.round(gross * (1 - reduceRate));          // 경감 후 자동차세
    const eduTax = Math.round(carTax * 0.3);                      // 지방교육세 30%
    const annual = carTax + eduTax;                              // 연간 총액
    const prepay = Math.round(carTax * 0.95) + eduTax;           // 1월 연납 시(자동차세 5% 공제)
    setOut({ perCc, reduceRate, carTax, eduTax, annual, prepay });
  }

  return (
    <div className="calc-box">
      <label>
        배기량 (cc)
        <input type="number" value={cc} onChange={(e) => setCc(e.target.value)} placeholder="예: 1998" />
      </label>
      <label>
        차령 (등록 후 경과 연수)
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="예: 3 (신차는 0)" />
      </label>
      <button type="button" onClick={run}>자동차세 계산하기</button>
      <div className="calc-out">
        {out == null && '배기량과 차령을 입력하면 연간 자동차세가 표시됩니다.'}
        {out && out.msg}
        {out && out.annual != null && (
          <div className="calc-breakdown">
            <span>자동차세 (cc당 {out.perCc}원{out.reduceRate > 0 ? ` · 차령경감 ${Math.round(out.reduceRate * 100)}%` : ''}) <b>{out.carTax.toLocaleString()}원</b></span>
            <span>지방교육세 (30%) <b>{out.eduTax.toLocaleString()}원</b></span>
            <span className="calc-total">연간 합계 <b>{out.annual.toLocaleString()}원</b></span>
            <span>1월 연납 시 (약 5% 공제) <b>{out.prepay.toLocaleString()}원</b></span>
          </div>
        )}
      </div>
      <p className="calc-note">
        ※ 비영업용 승용차 기준 예상액입니다. 전기·수소차(배기량 없음)는 별도 정액이며, 연납 공제액은 신청 월에 따라 달라집니다. 정확한 금액은 <a href="https://www.wetax.go.kr" target="_blank" rel="noopener noreferrer">위택스</a> 또는 관할 시·군·구청에서 확인하세요.
      </p>
    </div>
  );
}
