'use client';
import { useState } from 'react';

// 주택 취득세 전용 계산기(1주택 유상취득 기준) — 상수는 전부 grounded(지방세법).
//  · 취득세: 6억 이하 1% / 6억~9억 누진(취득가액(억)×2/3−3, %) / 9억 초과 3%
//  · 지방교육세 = 취득세액 × 10%  (지방세법: 표준세율×50%×20% = 취득세율×10%)
//  · 농어촌특별세 = 전용 85㎡ 초과 시 취득가액 × 0.2%, 85㎡ 이하 비과세
// 다주택·조정대상지역 중과(8·12%)는 지역지정이 수시로 바뀌어 여기 넣지 않음(본문 표+공식링크로 안내).
// 결과는 사용자가 입력한 값에 대한 계산이지 지어낸 사실이 아님(그라운딩 원칙).
export default function AcqTaxCalculator() {
  const [man, setMan] = useState(''); // 취득가액(만원)
  const [over85, setOver85] = useState(false);
  const [out, setOut] = useState(null);

  function run() {
    const price = parseInt(man || '0', 10) * 10000; // 만원 → 원
    if (!price) { setOut({ msg: '취득가액(만원)을 입력해 주세요.' }); return; }

    let rate; // 취득세율(%)
    if (price <= 600000000) rate = 1.0;
    // 6~9억 누진: 위택스 공식대로 세율을 소수점 넷째자리(=백분율 둘째자리)에서 반올림 후 적용
    else if (price <= 900000000) rate = Math.round(((price / 100000000) * (2 / 3) - 3) * 100) / 100;
    else rate = 3.0;

    const acq = Math.round(price * rate / 100);      // 취득세 본세
    const edu = Math.round(acq * 0.1);               // 지방교육세 = 취득세 × 10%
    const rural = over85 ? Math.round(price * 0.002) : 0; // 농특세 0.2%(85㎡ 초과)
    const total = acq + edu + rural;
    setOut({ rate, acq, edu, rural, total });
  }

  return (
    <div className="calc-box">
      <label>
        취득가액 (만원)
        <input
          type="number"
          value={man}
          onChange={(e) => setMan(e.target.value)}
          placeholder="예: 70000 (= 7억원)"
        />
      </label>
      <label className="calc-check">
        <input type="checkbox" checked={over85} onChange={(e) => setOver85(e.target.checked)} />
        전용면적 85㎡ 초과 (농어촌특별세 대상)
      </label>
      <button type="button" onClick={run}>취득세 계산하기</button>
      <div className="calc-out">
        {out == null && '취득가액을 입력하면 예상 세액이 표시됩니다.'}
        {out && out.msg}
        {out && out.total != null && (
          <div className="calc-breakdown">
            <span>취득세 (세율 {out.rate.toFixed(2)}%) <b>{out.acq.toLocaleString()}원</b></span>
            <span>지방교육세 <b>{out.edu.toLocaleString()}원</b></span>
            <span>농어촌특별세 <b>{out.rural.toLocaleString()}원</b></span>
            <span className="calc-total">예상 합계 <b>{out.total.toLocaleString()}원</b></span>
          </div>
        )}
      </div>
      <p className="calc-note">
        ※ 1주택 유상취득(매매) 기준의 예상액입니다. 다주택·조정대상지역 중과, 감면·비과세, 시가표준액 적용 등은 반영되지 않습니다. 정확한 금액은 <a href="https://www.wetax.go.kr" target="_blank" rel="noopener noreferrer">위택스</a> 공식 계산 또는 관할 시·군·구청에서 확인하세요.
      </p>
    </div>
  );
}
