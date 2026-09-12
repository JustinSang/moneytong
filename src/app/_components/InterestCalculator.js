'use client';
import { useState } from 'react';

// 예금 이자 계산기 — 순수 공식 + 이자소득세 15.4%(소득세 14% + 지방소득세 1.4%, grounded).
//  · 단리: 이자 = 원금 × 연이율 × (개월/12)
//  · 월복리: 이자 = 원금 × ((1 + 연이율/12)^개월 − 1)
//  · 세후 수령이자 = 이자 × (1 − 0.154)
// 검산: 1,000만·연3%·12개월 단리 → 세전이자 300,000 · 세금 46,200 · 세후 253,800원.
export default function InterestCalculator() {
  const [man, setMan] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [mode, setMode] = useState('simple');
  const [out, setOut] = useState(null);

  function run() {
    const P = parseInt(man || '0', 10) * 10000;
    const annual = parseFloat(rate || '0');
    const n = parseInt(months || '0', 10);
    if (!P || !n) { setOut({ msg: '예치금액과 기간을 입력해 주세요.' }); return; }
    const gross = mode === 'compound'
      ? Math.round(P * (Math.pow(1 + annual / 100 / 12, n) - 1))
      : Math.round(P * (annual / 100) * (n / 12));
    const tax = Math.round(gross * 0.154);
    const net = gross - tax;
    setOut({ gross, tax, net, total: P + net });
  }

  return (
    <div className="calc-box">
      <label>
        예치금액 (만원)
        <input type="number" value={man} onChange={(e) => setMan(e.target.value)} placeholder="예: 1000 (= 1,000만원)" />
      </label>
      <label>
        연이율 (%)
        <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="예: 3.5" />
      </label>
      <label>
        예치기간 (개월)
        <input type="number" value={months} onChange={(e) => setMonths(e.target.value)} placeholder="예: 12" />
      </label>
      <label>
        이자 방식
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="simple">단리</option>
          <option value="compound">월복리</option>
        </select>
      </label>
      <button type="button" onClick={run}>이자 계산하기</button>
      <div className="calc-out">
        {out == null && '금액·이율·기간을 입력하면 세후 이자가 표시됩니다.'}
        {out && out.msg}
        {out && out.total != null && (
          <div className="calc-breakdown">
            <span>세전 이자 <b>{out.gross.toLocaleString()}원</b></span>
            <span>이자과세 (15.4%) <b>−{out.tax.toLocaleString()}원</b></span>
            <span className="calc-total">세후 수령 이자 <b>{out.net.toLocaleString()}원</b></span>
            <span>만기 수령액 (원금+이자) <b>{out.total.toLocaleString()}원</b></span>
          </div>
        )}
      </div>
      <p className="calc-note">
        ※ 일반 과세(15.4%) 기준 예금 예상액입니다. 비과세·세금우대, 적금(매월 납입) 방식은 결과가 다릅니다. 정확한 금액은 해당 금융기관에서 확인하세요.
      </p>
    </div>
  );
}
