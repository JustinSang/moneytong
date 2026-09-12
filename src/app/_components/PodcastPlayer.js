"use client";

import { useState, useRef, useEffect } from "react";

const CHAPTERS = [
  { time: 0, label: "00:00 연금 기본 비교" },
  { time: 225, label: "03:45 감액 없이 일하는 법" },
  { time: 500, label: "08:20 조기 vs 연기연금 손익" },
  { time: 790, label: "13:10 기초연금 34.9만원 요건" },
  { time: 1050, label: "17:30 부부 감액 방지 꿀팁" },
];

export default function PodcastPlayer({ title = "2026 국민연금 vs 기초연금 100% 수령 전략 라디오 팟캐스트" }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1210);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const seek = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const jumpToChapter = (time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
    if (!isPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSliderChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const changeRate = (rate) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return ;
  };

  return (
    <div className="podcast-card">
      <audio ref={audioRef} preload="metadata">
        <source src="/audio/pension-podcast-2026.mp3" type="audio/mpeg" />
        브라우저가 오디오 재생을 지원하지 않습니다.
      </audio>

      {/* 헤더 */}
      <div className="podcast-header">
        <div className="podcast-title-group">
          <div>
            <span className="podcast-badge">오디오 해설</span>
            <h4 className="podcast-title">{title}</h4>
          </div>
        </div>
        <div className="podcast-speed-group">
          {[1.0, 1.2, 1.5].map((rate) => (
            <button
              key={rate}
              onClick={() => changeRate(rate)}
              className={"podcast-speed-btn" + (playbackRate === rate ? " active" : "")}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      {/* 컨트롤 영역 */}
      <div className="podcast-controls">
        {/* 진행 바 */}
        <div className="podcast-slider-wrap">
          <input
            type="range"
            min="0"
            max={duration || 1210}
            value={currentTime}
            onChange={handleSliderChange}
            className="podcast-slider"
          />
          <div className="podcast-time-row">
            <span>{formatTime(currentTime)}</span>
            <span>총 {formatTime(duration)}</span>
          </div>
        </div>

        {/* 재생 버튼 그룹 */}
        <div className="podcast-btn-row">
          <button onClick={() => seek(-15)} className="podcast-seek-btn" title="15초 뒤로">
            15s ◀
          </button>
          <button onClick={togglePlay} className="podcast-play-btn" title="재생 / 일시정지">
            {isPlaying ? "일시정지" : "재생"}
          </button>
          <button onClick={() => seek(15)} className="podcast-seek-btn" title="15초 앞으로">
            ▶ 15s
          </button>
        </div>
      </div>

      {/* 챕터 바로가기 */}
      <div className="podcast-chapters-box">
        <p className="podcast-chapters-title">주요 구간별 듣기</p>
        <div className="podcast-chapters-list">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={idx}
              onClick={() => jumpToChapter(ch.time)}
              className="podcast-chapter-chip"
            >
              {ch.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
