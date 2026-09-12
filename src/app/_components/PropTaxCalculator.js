'use client';
import { useState } from 'react';

// 주택 재산세 전용 계산기 — 상수는 전부 grounded(지방세법·2026 시행령).
//  · 과세표준 = 공시가격 × 공정시장가액비율
//      1세대1주택 특례(공시가 9억↓): 3억↓ 43% / 3~6억 44% / 6억↑ 45%   |  다주택·일반: 60%
//  · 세율(과표 기준, 누진공제 방식 = 과표×세율 − 공제):
//      표준: 6천만↓ 0.1% / ~1.5억 0.15%(−3만) / ~3억 0.25%(−18만) / 3억↑ 0.4%(−63만)
//      1주택특례: 6천만↓ 0.05% / ~1.5억 0.1%(−3만) / ~3억 0.2%(−18만) / 3억↑ 0.35%(−63만)
//  · 지방교육세 = 재산세 본세 × 20%   ·   도시지역분 = 과세표준 × 0.14%(도시지역)
// 검산: 공시가 4억 1주택 특례 → 과표 1.76억 → 본세 17.2만(=정책브리핑 공식예시 약172,000원과 일치).
const STD = [[60000000, 0.001, 0], [150000000, 0.0015, 30000], [300000000, 0.0025, 180000], [Infinity, 0.004, 630000]];
const SPECIAL = [[60000000, 0.0005, 0], [150000000, 0.001, 30000], [300000000, 0.002, 180000], [Infinity, 0.0035, 630000]];

export default function PropTaxCalculator() {
  const [man, setMan] = useState('');       // 공시가격(만원)
  const [special, setSpecial] = useState(true); // 1세대1주택 특례
  const [urban, setUrban] = useState(true);  // 도시지역분 포함
  const [out, setOut] = useState(null);

  function run() {
    const gongsi = parseInt(man || '0', 10) * 10000; // 만원 → 원
    if (!gongsi) { setOut({ msg: '공시가격(만원)을 입력해 주세요.' }); return; }
    if (special && gongsi > 900000000) {
      setOut({ msg: '⚠️ 공시가격 9억원 초과는 1세대1주택 특례 대상이 아닙니다. 특례 체크를 해제하고 표준세율로 계산하세요.' });
      return;
    }
    const ratio = special
      ? (gongsi <= 300000000 ? 0.43 : gongsi <= 600000000 ? 0.44 : 0.45)
      : 0.60;
    const base = Math.floor(gongsi * ratio); // 과세표준
    const table = special ? SPECIAL : STD;
    let rate = 0, deduct = 0;
    for (const [cap, r, d] of table) { if (base <= cap) { rate = r; deduct = d; break; } }
    const main = Math.max(0, Math.floor(base * rate - deduct)); // 재산세 본세
    const edu = Math.floor(main * 0.2);                          // 지방교육세
    const urbanTax = urban ? Math.floor(base * 0.0014) : 0;      // 도시지역분
    const total = main + edu + urbanTax;
    setOut({ ratio, base, main, edu, urbanTax, total });
  }

  return (
    <div className="calc-box">
      <label>
        공시가격 (만원)
        <input type="number" value={man} onChange={(e) => setMan(e.target.value)} placeholder="예: 40000 (= 4억원)" />
      </label>
      <label className="calc-check">
        <input type="checkbox" checked={special} onChange={(e) => setSpecial(e.target.checked)} />
        1세대1주택 특례 적용 (공시가격 9억원 이하)
      </label>
      <label className="calc-check">
        <input type="checkbox" checked={urban} onChange={(e) => setUrban(e.target.checked)} />
        도시지역분 포함 (대부분의 도시지역 해당)
      </label>
      <button type="button" onClick={run}>재산세 계산하기</button>
      <div className="calc-out">
        {out == null && '공시가격을 입력하면 예상 재산세가 표시됩니다.'}
        {out && out.msg}
        {out && out.total != null && (
          <div className="calc-breakdown">
            <span>과세표준 (공정시장가액비율 {Math.round(out.ratio * 100)}%) <b>{out.base.toLocaleString()}원</b></span>
            <span>재산세 본세 <b>{out.main.toLocaleString()}원</b></span>
            {out.urbanTax > 0 && <span>도시지역분 <b>{out.urbanTax.toLocaleString()}원</b></span>}
            <span>지방교육세 <b>{out.edu.toLocaleString()}원</b></span>
            <span className="calc-total">예상 합계 <b>{out.total.toLocaleString()}원</b></span>
          </div>
        )}
      </div>
      <p className="calc-note">
        ※ 주택 재산세 예상액입니다. 지역자원시설세, 세부담상한, 감면 등은 반영되지 않으며 실제 고지액과 다를 수 있습니다. 정확한 금액은 <a href="https://www.wetax.go.kr" target="_blank" rel="noopener noreferrer">위택스</a> 또는 관할 시·군·구청에서 확인하세요.
      </p>
    </div>
  );
}
