'use client';
import { useState } from 'react';

// config 기반 재사용 계산기 — "기준값 × 비율, [하한,상한] clamp, × 개수" 패턴(실업급여·수당류 공통).
// 계산 상수(rate/min/max)는 grounded 값만 넣는다. 결과는 사용자 입력에 대한 계산이지 지어낸 사실이 아님.
export default function Calculator({ config }) {
  const c = config || {};
  const [base, setBase] = useState('');
  const [count, setCount] = useState(c.countOptions ? c.countOptions[0].v : '');
  const [out, setOut] = useState(null);

  function run() {
    const b = parseInt(base || '0', 10);
    if (!b) { setOut({ msg: `${c.baseLabel || '값'}을 입력해 주세요.` }); return; }
    let daily = Math.round(b * (c.rate ?? 1));
    if (c.max != null && daily > c.max) daily = c.max;
    if (c.min != null && daily < c.min) daily = c.min;
    const n = parseInt(count || '0', 10) || 1;
    setOut({ daily, n, total: daily * n });
  }

  return (
    <div className="calc-box">
      <label>
        {c.baseLabel || '기준값'} (원)
        <input type="number" value={base} onChange={(e) => setBase(e.target.value)} placeholder={c.basePlaceholder || ''} />
      </label>
      {c.countOptions && (
        <label>
          {c.countLabel || '개수'}
          <select value={count} onChange={(e) => setCount(e.target.value)}>
            {c.countOptions.map((o) => <option key={o.v} value={o.v}>{o.label}</option>)}
          </select>
        </label>
      )}
      <button type="button" onClick={run}>{c.button || '계산하기'}</button>
      <div className="calc-out">
        {out == null && (c.idle || '값을 입력하면 결과가 표시됩니다.')}
        {out && out.msg}
        {out && out.total != null && (
          <span>{c.dailyLabel || '1일 지급액'} <b>{out.daily.toLocaleString()}원</b> × {out.n}{c.countUnit || ''} = 예상 총 <b>{out.total.toLocaleString()}원</b></span>
        )}
      </div>
      {c.note && <p className="calc-note">{c.note}</p>}
    </div>
  );
}
