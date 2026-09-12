'use client';
import { useState } from 'react';

// 대출 상환 계산기(원리금균등상환) — 순수 수학 공식이라 지어낸 사실이 없음(그라운딩 리스크 0).
//  · 월상환액 = P × r × (1+r)^n / ((1+r)^n − 1)   (P=원금, r=월이율=연이율/12, n=개월수)
//  · 무이자(r=0)면 P/n. 총이자 = 월상환액×n − P.
// 검산: 1억·연3%·30년 → 월 약 421,604원, 총이자 약 51,777,000원.
export default function LoanCalculator() {
  const [man, setMan] = useState('');    // 대출원금(만원)
  const [rate, setRate] = useState('');  // 연이율(%)
  const [years, setYears] = useState(''); // 기간(년)
  const [out, setOut] = useState(null);

  function run() {
    const P = parseInt(man || '0', 10) * 10000;
    const annual = parseFloat(rate || '0');
    const y = parseInt(years || '0', 10);
    if (!P || !y) { setOut({ msg: '대출원금과 기간을 입력해 주세요.' }); return; }
    const r = annual / 100 / 12;
    const n = y * 12;
    const monthly = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const m = Math.round(monthly);
    const total = m * n;
    const interest = total - P;
    setOut({ m, total, interest, n });
  }

  return (
    <div className="calc-box">
      <label>
        대출원금 (만원)
        <input type="number" value={man} onChange={(e) => setMan(e.target.value)} placeholder="예: 10000 (= 1억원)" />
      </label>
      <label>
        연이율 (%)
        <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="예: 3.5" />
      </label>
      <label>
        상환기간 (년)
        <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="예: 30" />
      </label>
      <button type="button" onClick={run}>월 상환액 계산하기</button>
      <div className="calc-out">
        {out == null && '원금·이율·기간을 입력하면 월 상환액이 표시됩니다.'}
        {out && out.msg}
        {out && out.m != null && (
          <div className="calc-breakdown">
            <span className="calc-total">월 상환액 <b>{out.m.toLocaleString()}원</b></span>
            <span>총 이자 <b>{out.interest.toLocaleString()}원</b></span>
            <span>총 상환액 (원금+이자) <b>{out.total.toLocaleString()}원</b></span>
            <span>상환 횟수 <b>{out.n}회</b></span>
          </div>
        )}
      </div>
      <p className="calc-note">
        ※ 원리금균등상환 방식 기준입니다. 실제 대출은 중도상환수수료·거치기간·변동금리·보증료 등에 따라 달라질 수 있으니, 정확한 조건은 해당 금융기관에서 확인하세요.
      </p>
    </div>
  );
}
