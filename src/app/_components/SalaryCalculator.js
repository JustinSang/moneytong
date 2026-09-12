'use client';
import { useState } from 'react';

// 연봉 실수령액 계산기 — 2026 4대보험 요율(실측) + 근로소득세(간이 근사).
//  · 4대보험(근로자): 국민연금 4.75%(2026 인상) · 건강 3.595% · 장기요양 건강료×13.14%(2026 인상) · 고용 0.9%
//  · 소득세: 연간 결정세액(근로소득공제·인적공제·4대보험공제·누진세율·근로소득세액공제) ÷ 12, 지방소득세 10%
//  · 소득세는 부양가족·비과세·각종 공제에 따라 달라지는 근사치(정확값은 홈택스·급여명세서).
const BRACKETS = [
  [14000000, 0.06, 0], [50000000, 0.15, 1260000], [88000000, 0.24, 5760000],
  [150000000, 0.35, 15440000], [300000000, 0.38, 19940000], [500000000, 0.40, 25940000],
  [1000000000, 0.42, 35940000], [Infinity, 0.45, 65940000],
];
function incomeTax(base) {
  for (const [cap, r, d] of BRACKETS) if (base <= cap) return Math.max(0, base * r - d);
  return 0;
}
function earnedDeduction(g) {
  let d;
  if (g <= 5000000) d = g * 0.7;
  else if (g <= 15000000) d = 3500000 + (g - 5000000) * 0.4;
  else if (g <= 45000000) d = 7500000 + (g - 15000000) * 0.15;
  else if (g <= 100000000) d = 12000000 + (g - 45000000) * 0.05;
  else d = 14750000 + (g - 100000000) * 0.02;
  return Math.min(d, 20000000);
}
function laborCredit(gross, calcTax) {
  const credit = calcTax <= 1300000 ? calcTax * 0.55 : 715000 + (calcTax - 1300000) * 0.3;
  let limit;
  if (gross <= 33000000) limit = 740000;
  else if (gross <= 70000000) limit = Math.max(660000, 740000 - (gross - 33000000) * 0.008);
  else if (gross <= 120000000) limit = Math.max(500000, 660000 - (gross - 70000000) * 0.5);
  else limit = Math.max(200000, 500000 - (gross - 120000000) * 0.5);
  return Math.min(credit, limit);
}

export default function SalaryCalculator() {
  const [man, setMan] = useState('');       // 연봉(만원)
  const [dependents, setDependents] = useState('0'); // 부양가족(본인 제외)
  const [taxFree, setTaxFree] = useState('20'); // 월 비과세(만원)
  const [out, setOut] = useState(null);

  function run() {
    const annual = parseInt(man || '0', 10) * 10000;
    if (!annual) { setOut({ msg: '연봉(만원)을 입력해 주세요.' }); return; }
    const dep = parseInt(dependents || '0', 10) || 0;
    const monthlyPay = Math.round(annual / 12);
    const monthlyFree = (parseInt(taxFree || '0', 10) || 0) * 10000;
    const taxable = Math.max(0, monthlyPay - monthlyFree); // 보수월액(과세)

    // 4대보험(월, 근로자 부담)
    const pension = Math.round(Math.min(taxable, 6170000) * 0.0475);
    const health = Math.round(taxable * 0.03595);
    const care = Math.round(health * 0.1314);
    const employ = Math.round(taxable * 0.009);
    const insurance = pension + health + care + employ;

    // 소득세(연간 근사 → 월)
    const yearTaxable = taxable * 12;
    const earned = yearTaxable - earnedDeduction(yearTaxable);
    const personal = 1500000 * (1 + dep);
    const insDeduction = insurance * 12;
    const base = Math.max(0, earned - personal - insDeduction);
    const calcTax = incomeTax(base);
    const decided = Math.max(0, calcTax - laborCredit(yearTaxable, calcTax));
    const incomeTaxM = Math.round(decided / 12);
    const localTax = Math.round(incomeTaxM * 0.1);

    const deductTotal = insurance + incomeTaxM + localTax;
    const net = monthlyPay - deductTotal;
    setOut({ monthlyPay, pension, health, care, employ, incomeTaxM, localTax, deductTotal, net });
  }

  return (
    <div className="calc-box">
      <label>
        연봉 (세전, 만원)
        <input type="number" value={man} onChange={(e) => setMan(e.target.value)} placeholder="예: 4000 (= 4,000만원)" />
      </label>
      <label>
        부양가족 수 (본인 제외)
        <input type="number" value={dependents} onChange={(e) => setDependents(e.target.value)} placeholder="예: 0" />
      </label>
      <label>
        월 비과세액 (식대 등, 만원)
        <input type="number" value={taxFree} onChange={(e) => setTaxFree(e.target.value)} placeholder="예: 20" />
      </label>
      <button type="button" onClick={run}>실수령액 계산하기</button>
      <div className="calc-out">
        {out == null && '연봉을 입력하면 월 실수령액이 표시됩니다.'}
        {out && out.msg}
        {out && out.net != null && (
          <div className="calc-breakdown">
            <span>월 세전 급여 <b>{out.monthlyPay.toLocaleString()}원</b></span>
            <span>국민연금 (4.75%) <b>−{out.pension.toLocaleString()}원</b></span>
            <span>건강보험 (3.595%) <b>−{out.health.toLocaleString()}원</b></span>
            <span>장기요양 <b>−{out.care.toLocaleString()}원</b></span>
            <span>고용보험 (0.9%) <b>−{out.employ.toLocaleString()}원</b></span>
            <span>소득세+지방소득세 <b>−{(out.incomeTaxM + out.localTax).toLocaleString()}원</b></span>
            <span className="calc-total">월 실수령액 <b>{out.net.toLocaleString()}원</b></span>
          </div>
        )}
      </div>
      <p className="calc-note">
        ※ 2026년 4대보험 요율 기준이며, 소득세는 부양가족·비과세·각종 공제에 따라 달라지는 <b>근사치</b>입니다. 장기요양보험료율(13.14%)·국민연금 상한은 개정될 수 있고, 실제 원천징수는 간이세액표를 따릅니다. 정확한 금액은 급여명세서·홈택스에서 확인하세요.
      </p>
    </div>
  );
}
