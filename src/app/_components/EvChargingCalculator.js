'use client';
import { useState } from 'react';

// 전기차 충전 요금 & 구독 요금제 비교 계산기
// 2026년 8월 환경부 공공 충전요금 5단계 개편안 및 주요 구독 요금제(SK일렉링크 등) 실측 기준.
//
// [공식 실측 기준 단가 (원/kWh)]
// · 환경부 공공 완속(30kW 미만): 295.0원
// · 환경부 공공 급속(50~100kW): 325.6원
// · 환경부 공공 초급속(200kW 이상): 393.1원
// · 아파트 완속(심야/경부하 평균): 약 240.0원 (단지별·사업자별 상이)
// · 내연기관 비교 기준: 휘발유 1,650원/L, 복합연비 13.0km/L
//
// [구독 요금제 모델 (SK일렉링크 럭키패스 실측 기준)]
// · 스타터: 월 900원 + 급속 315원/kWh (50kWh 약정)
// · 베이직: 월 3,900원 + 급속 305원/kWh (150kWh 약정)
// · 프로: 월 8,900원 + 급속 300원/kWh (300kWh 약정)
// · 마스터: 월 19,900원 + 급속 295원/kWh (무제한)

const PATTERN_RATES = {
  home: { label: '집밥/아파트 완속 위주 (심야 80% + 급속 20%)', unitPrice: 257.1, desc: '아파트 완속 심야(240원) 80% + 공공 급속(325.6원) 20%' },
  public_standard: { label: '공공 표준 충전 (완속 50% + 급속 50%)', unitPrice: 310.3, desc: '환경부 완속(295원) 50% + 공공 급속(325.6원) 50%' },
  public_fast: { label: '외부 급속 위주 (공공 급속 80% + 초급속 20%)', unitPrice: 339.1, desc: '공공 급속(325.6원) 80% + 초급속(393.1원) 20%' },
  highway_ultrafast: { label: '장거리/초급속 위주 (초급속 70% + 급속 30%)', unitPrice: 372.9, desc: '초급속(393.1원) 70% + 급속(325.6원) 30%' },
};

const SUB_PLANS = [
  { id: 'sk_starter', name: '스타터', monthlyFee: 900, rate: 315, cap: 50 },
  { id: 'sk_basic', name: '베이직', monthlyFee: 3900, rate: 305, cap: 150 },
  { id: 'sk_pro', name: '프로', monthlyFee: 8900, rate: 300, cap: 300 },
  { id: 'sk_master', name: '마스터', monthlyFee: 19900, rate: 295, cap: 99999 },
];

export default function EvChargingCalculator() {
  const [distance, setDistance] = useState('1500');
  const [efficiency, setEfficiency] = useState('5.0');
  const [pattern, setPattern] = useState('home');
  const [out, setOut] = useState(null);

  function run() {
    const dist = parseFloat(distance || '0');
    const eff = parseFloat(efficiency || '0');

    if (!dist || dist <= 0) {
      setOut({ msg: '월 예상 주행거리(km)를 올바르게 입력해 주세요.' });
      return;
    }
    if (!eff || eff <= 0) {
      setOut({ msg: '전비(km/kWh)를 올바르게 입력해 주세요. (보통 4.0 ~ 6.0)' });
      return;
    }

    // 1. 월 필요 전력량
    const monthlyKwh = Math.round((dist / eff) * 10) / 10;

    // 2. 패턴별 전기차 월 충전비
    const selectedPattern = PATTERN_RATES[pattern];
    const patternCost = Math.round(monthlyKwh * selectedPattern.unitPrice);

    // 완속(집밥)만 쓸 때
    const homeOnlyCost = Math.round(monthlyKwh * 240.0);
    // 공공 급속만 쓸 때
    const publicFastOnlyCost = Math.round(monthlyKwh * 325.6);

    // 3. 구독 요금제 시뮬레이션 (급속 충전 기준)
    let bestSub = null;
    let minSubCost = Infinity;

    SUB_PLANS.forEach((plan) => {
      // 약정량 이내는 할인가, 초과량은 일반 급속(325.6원) 계산
      const discountedKwh = Math.min(monthlyKwh, plan.cap);
      const regularKwh = Math.max(monthlyKwh - plan.cap, 0);
      const subTotal = Math.round(plan.monthlyFee + (discountedKwh * plan.rate) + (regularKwh * 325.6));

      if (subTotal < minSubCost) {
        minSubCost = subTotal;
        bestSub = { ...plan, total: subTotal };
      }
    });

    // 4. 동급 가솔린 차량 유류비 비교 (휘발유 1,650원/L, 복합연비 13.0 km/L)
    const gasolineLiters = Math.round((dist / 13.0) * 10) / 10;
    const gasolineCost = Math.round(gasolineLiters * 1650);

    // 5. 절감액
    const monthlySavings = gasolineCost - patternCost;
    const annualSavings = monthlySavings * 12;

    // 6. 맞춤형 인사이트 진단
    let advice = '';
    if (pattern === 'home') {
      advice = `집/아파트 완속 충전이 가능하시면 월 ${patternCost.toLocaleString()}원으로 가장 경제적입니다. 밖에서 급속 위주로 충전할 때보다 월 약 ${(publicFastOnlyCost - patternCost).toLocaleString()}원을 아끼실 수 있습니다.`;
    } else {
      if (bestSub && minSubCost < publicFastOnlyCost) {
        const subSavings = publicFastOnlyCost - minSubCost;
        advice = `외부 급속 충전을 주로 이용하신다면, [${bestSub.name} 구독 요금제](월 ${bestSub.monthlyFee.toLocaleString()}원) 이용 시 일반 급속 대비 월 약 ${subSavings.toLocaleString()}원을 추가 절감(월 예상 ${minSubCost.toLocaleString()}원)할 수 있습니다.`;
      } else {
        advice = `현재 주행거리에서는 고정 구독료보다 일반 회원 충전(월 ${publicFastOnlyCost.toLocaleString()}원)이 더 경제적입니다.`;
      }
    }

    setOut({
      dist,
      eff,
      monthlyKwh,
      patternCost,
      selectedPattern,
      homeOnlyCost,
      publicFastOnlyCost,
      bestSub,
      minSubCost,
      gasolineCost,
      gasolineLiters,
      monthlySavings,
      annualSavings,
      advice,
    });
  }

  return (
    <div className="calc-box">
      <label>
        월 예상 주행거리 (km)
        <input
          type="number"
          step="100"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="예: 1500 (출퇴근+주말 주행)"
        />
      </label>

      <label>
        전비 (km/kWh)
        <input
          type="number"
          step="0.1"
          value={efficiency}
          onChange={(e) => setEfficiency(e.target.value)}
          placeholder="예: 5.0 (국산 보급형 전기차 평균 4.5~5.5)"
        />
      </label>

      <label>
        주 충전 패턴 (충전 환경)
        <select value={pattern} onChange={(e) => setPattern(e.target.value)}>
          <option value="home">집밥/아파트 완속 위주 (완속 80% + 급속 20%)</option>
          <option value="public_standard">공공 표준 충전 (완속 50% + 급속 50%)</option>
          <option value="public_fast">외부 급속 위주 (공공 급속 80% + 초급속 20%)</option>
          <option value="highway_ultrafast">장거리/고속도로 위주 (초급속 70% + 급속 30%)</option>
        </select>
      </label>

      <button type="button" onClick={run}>
        충전 요금 & 절감액 계산하기
      </button>

      <div className="calc-out">
        {out == null && '주행거리와 전비를 입력하면 월 예상 충전비와 휘발유 대비 절감액이 즉시 계산됩니다.'}
        {out && out.msg}
        {out && out.patternCost != null && (
          <div className="calc-breakdown">
            <span>
              월 필요 충전량 ({out.dist.toLocaleString()}km ÷ {out.eff}km/kWh)
              <b>{out.monthlyKwh.toLocaleString()} kWh</b>
            </span>

            <span>
              선택 패턴 월 충전비 ({out.selectedPattern.label.split(' (')[0]})
              <b>{out.patternCost.toLocaleString()} 원</b>
            </span>

            <span>
              집밥 완속 100% 이용 시 (240원/kWh 기준)
              <b>{out.homeOnlyCost.toLocaleString()} 원</b>
            </span>

            <span>
              공공 급속 100% 이용 시 (325.6원/kWh 기준)
              <b>{out.publicFastOnlyCost.toLocaleString()} 원</b>
            </span>

            {out.bestSub && (
              <span>
                급속 구독제 적용 시 (SK {out.bestSub.name} 요금제)
                <b>{out.minSubCost.toLocaleString()} 원</b>
              </span>
            )}

            <span className="calc-total">
              동급 가솔린(휘발유) 월 유류비 대비
              <b>월 {out.monthlySavings > 0 ? `${out.monthlySavings.toLocaleString()}원 절약` : '유사'}</b>
            </span>

            <span style={{ fontSize: '0.9rem', color: '#555', marginTop: '4px' }}>
              연간 예상 절감액: <b>약 {out.annualSavings.toLocaleString()}원 절약</b> (휘발유 연 {(out.gasolineCost * 12).toLocaleString()}원 vs 전기차 {(out.patternCost * 12).toLocaleString()}원)
            </span>

            <div style={{ marginTop: '10px', padding: '10px', background: '#f0f7ff', borderRadius: '8px', fontSize: '0.9rem', lineHeight: '1.5' }}>
              💡 <strong>머니통 맞춤 진단:</strong> {out.advice}
            </div>
          </div>
        )}
      </div>

      <p className="calc-note">
        ※ 2026년 8월 환경부 공공 충전요금 5단계 기준(완속 295.0원, 급속 325.6원, 초급속 393.1원) 및 SK일렉링크 럭키패스 요금제를 적용한 추정치입니다. 아파트 단지별 계약 및 충전 사업자(파워큐브·에버온 등) 프로모션에 따라 실제 청구 금액은 달라질 수 있습니다.
      </p>
    </div>
  );
}
