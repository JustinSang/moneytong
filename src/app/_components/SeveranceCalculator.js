'use client';
import { useState } from 'react';

// 퇴직금 계산기 — 근로기준법 법정 산식(grounded, 세율 실측 불필요).
//  · 1일 평균임금 = (퇴직 전 3개월 임금총액) / (그 기간 총일수)  → 여기선 월평균임금 × 3 / 91.25 로 근사
//  · 퇴직금 = 1일 평균임금 × 30 × (총재직일수 / 365)
// 검산: 월 300만·재직 3년 → 약 8,876,700원.
export default function SeveranceCalculator() {
  const [man, setMan] = useState('');    // 월평균임금(만원)
  const [years, setYears] = useState(''); // 재직 연수
  const [months, setMonths] = useState(''); // 재직 개월(추가)
  const [out, setOut] = useState(null);

  function run() {
    const wage = parseInt(man || '0', 10) * 10000;
    const y = parseInt(years || '0', 10);
    const mo = parseInt(months || '0', 10);
    const days = y * 365 + mo * 30;
    if (!wage || days <= 0) { setOut({ msg: '월평균임금과 재직기간을 입력해 주세요.' }); return; }
    const dailyWage = wage * 3 / 91.25;                 // 1일 평균임금(근사)
    const severance = Math.round(dailyWage * 30 * days / 365);
    setOut({ dailyWage: Math.round(dailyWage), days, severance });
  }

  return (
    <div className="calc-box">
      <label>
        월평균임금 (세전, 만원)
        <input type="number" value={man} onChange={(e) => setMan(e.target.value)} placeholder="예: 300 (= 300만원)" />
      </label>
      <label>
        재직 연수 (년)
        <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="예: 3" />
      </label>
      <label>
        추가 개월 (년 단위 외 나머지)
        <input type="number" value={months} onChange={(e) => setMonths(e.target.value)} placeholder="예: 6" />
      </label>
      <button type="button" onClick={run}>퇴직금 계산하기</button>
      <div className="calc-out">
        {out == null && '월평균임금과 재직기간을 입력하면 예상 퇴직금이 표시됩니다.'}
        {out && out.msg}
        {out && out.severance != null && (
          <div className="calc-breakdown">
            <span>1일 평균임금 (근사) <b>{out.dailyWage.toLocaleString()}원</b></span>
            <span>총 재직일수 <b>{out.days.toLocaleString()}일</b></span>
            <span className="calc-total">예상 퇴직금 <b>{out.severance.toLocaleString()}원</b></span>
          </div>
        )}
      </div>
      <p className="calc-note">
        ※ 계속근로 1년 이상 근로자 기준 예상액입니다. 실제 1일 평균임금은 퇴직 전 3개월의 실제 임금·일수(상여·수당 포함)로 계산되어 결과가 다를 수 있으며, 퇴직소득세는 별도입니다. 정확한 금액은 회사·고용노동부에서 확인하세요.
      </p>
    </div>
  );
}
