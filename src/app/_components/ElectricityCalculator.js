'use client';
import { useState } from 'react';

// 주택용 저압 전기요금 계산기 — 상수는 한전 주택용(저압) 누진제 기준.
// [발행 전 한전 공식요금표 재확인 대상: 특히 연료비조정요금은 분기별 변동]
//  · 기본요금(원/호): 200kWh↓ 910 / 201~400 1,600 / 400 초과 7,300
//  · 전력량요금(원/kWh): 1구간(~200) 120.0 / 2구간(201~400) 214.6 / 3구간(400↑) 307.3
//  · 기후환경요금 9.0원/kWh · 연료비조정요금 5.0원/kWh(전 사용량, 분기 변동)
//  · 부가가치세 10% · 전력산업기반기금 3.7%(10원 미만 절사) · 청구금액 10원 미만 절사
// 검산(300kWh): 기본1,600 + 전력량45,460 + 기후·연료4,200 = 51,260 → 부가세5,126 + 기금1,890 = 청구 58,270원
const BASIC = (u) => (u <= 200 ? 910 : u <= 400 ? 1600 : 7300);

export default function ElectricityCalculator() {
  const [kwh, setKwh] = useState('');
  const [out, setOut] = useState(null);

  function run() {
    const u = parseInt(kwh || '0', 10);
    if (!u || u < 0) { setOut({ msg: '한 달 사용량(kWh)을 입력해 주세요.' }); return; }

    const basic = BASIC(u);
    const t1 = Math.min(u, 200) * 120.0;
    const t2 = Math.min(Math.max(u - 200, 0), 200) * 214.6;
    const t3 = Math.max(u - 400, 0) * 307.3;
    const energy = Math.round(t1 + t2 + t3);
    const climate = Math.round(u * 9.0);
    const fuel = Math.round(u * 5.0);
    const subtotal = basic + energy + climate + fuel;      // 전기요금계
    const vat = Math.round(subtotal * 0.1);                 // 부가가치세 10%
    const fund = Math.floor((subtotal * 0.037) / 10) * 10;  // 전력기반기금 3.7%, 10원 절사
    const total = Math.floor((subtotal + vat + fund) / 10) * 10; // 청구금액 10원 절사
    const topTier = u <= 200 ? '1구간' : u <= 400 ? '2구간' : '3구간(누진 최고)';
    setOut({ basic, energy, climate, fuel, subtotal, vat, fund, total, topTier });
  }

  return (
    <div className="calc-box">
      <label>
        한 달 사용량 (kWh)
        <input type="number" value={kwh} onChange={(e) => setKwh(e.target.value)} placeholder="예: 350 (여름 에어컨 사용 시)" />
      </label>
      <button type="button" onClick={run}>전기요금 계산하기</button>
      <div className="calc-out">
        {out == null && '한 달 사용량(kWh)을 넣으면 예상 청구금액이 표시됩니다. (검침표·한전 앱에서 확인)'}
        {out && out.msg}
        {out && out.total != null && (
          <div className="calc-breakdown">
            <span>기본요금 <b>{out.basic.toLocaleString()}원</b></span>
            <span>전력량요금 (누진 {out.topTier}) <b>{out.energy.toLocaleString()}원</b></span>
            <span>기후환경 + 연료비조정 <b>{(out.climate + out.fuel).toLocaleString()}원</b></span>
            <span>부가세 10% + 전력기반기금 3.7% <b>{(out.vat + out.fund).toLocaleString()}원</b></span>
            <span className="calc-total">예상 청구금액 <b>{out.total.toLocaleString()}원</b></span>
          </div>
        )}
      </div>
      <p className="calc-note">
        ※ 주택용 저압 누진제 기준 예상액입니다. 고압(대단지 아파트 일부)·계절별 요금·복지할인·연료비조정(분기 변동)에 따라 실제 청구액과 다를 수 있습니다. 정확한 금액은 <a href="https://cyber.kepco.co.kr" target="_blank" rel="noopener noreferrer">한전 사이버지점</a> 또는 한전:ON 앱에서 확인하세요.
      </p>
    </div>
  );
}
