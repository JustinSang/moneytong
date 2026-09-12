'use client';
import { useState } from 'react';

// 상가/자영업 적정 계약전력 추정기 — 사용설비(가전) 부하 × 사용시간 기반 월사용량 추정 후
// "월사용량(kWh) ÷ 기준시간" 추정법(업계 통용, 요기요 파트너센터 등 다수 자료 근거).
// [중요] 한전 공식 "신규 계약전력 산정"은 사용설비 용량 합계에 환산율(75kW까지 100%,
// 다음 75kW 85% 등)을 적용하는 별도 방식이다(KEPCO 공식 페이지 확인). 이 계산기는 그 공식
// 산정법이 아니라, "현재 사용량 대비 계약전력이 적정한지" 가늠하는 실무 참고용 추정 도구다.
// 기준시간: 일반 업종 450시간(1일 15시간×30일), 24시간 운영 특례 720시간(24시간×30일).
const HOURS = { normal: 450, h24: 720 };

export default function ContractPowerCalculator() {
  const [kw, setKw] = useState('');
  const [hours, setHours] = useState('');
  const [mode, setMode] = useState('normal');
  const [out, setOut] = useState(null);

  function run() {
    const totalKw = parseFloat(kw || '0');
    const dailyHours = parseFloat(hours || '0');
    if (!totalKw || !dailyHours) {
      setOut({ msg: '가전·설비 총 소비전력(kW)과 하루 평균 사용시간을 입력해 주세요.' });
      return;
    }
    const monthlyKwh = Math.round(totalKw * dailyHours * 30);
    const divisor = HOURS[mode];
    const estimatedKw = Math.ceil(monthlyKwh / divisor);
    setOut({ monthlyKwh, estimatedKw, divisor });
  }

  return (
    <div className="calc-box">
      <label>
        가전·설비 총 소비전력 합 (kW)
        <input type="number" step="0.1" value={kw} onChange={(e) => setKw(e.target.value)} placeholder="예: 냉난방기+주방기기 합산 5.5" />
      </label>
      <label>
        하루 평균 사용시간 (시간)
        <input type="number" step="0.5" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="예: 10" />
      </label>
      <label>
        영업 형태
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="normal">일반 영업(1일 15시간 기준, 450시간)</option>
          <option value="h24">24시간 운영 특례(720시간)</option>
        </select>
      </label>
      <button type="button" onClick={run}>적정 계약전력 추정하기</button>
      <div className="calc-out">
        {out == null && '설비 소비전력과 사용시간을 넣으면 월 예상 사용량과 적정 계약전력(추정)을 계산합니다.'}
        {out && out.msg}
        {out && out.estimatedKw != null && (
          <div className="calc-breakdown">
            <span>월 예상 사용량 <b>{out.monthlyKwh.toLocaleString()}kWh</b></span>
            <span>기준시간 <b>{out.divisor}시간</b></span>
            <span className="calc-total">적정 계약전력(추정) <b>약 {out.estimatedKw}kW</b></span>
          </div>
        )}
      </div>
      <p className="calc-note">
        ※ 이 계산기는 업계에서 통용되는 <b>추정 참고용</b>이며, 한전의 공식 <b>신규 계약전력 산정</b>은
        사용설비 용량 합계에 환산율(예: 처음 75kW 100%, 다음 75kW 85%)을 적용하는 별도 방식입니다.
        실제 계약전력 신청·증설은 반드시 <a href="https://cyber.kepco.co.kr" target="_blank" rel="noopener noreferrer">한전 사이버지점</a> 또는 고객센터 123에서 확인하세요.
      </p>
    </div>
  );
}
