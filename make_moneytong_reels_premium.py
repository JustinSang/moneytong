import sys
sys.path.append("/Users/justinsm1max/Desktop/unible_harness")

import os
from pathlib import Path
from PIL import Image
import subprocess
import audiobook.make_audiobook

# --- 1. 벤치마크 영상 목소리 완벽 클로닝 ---
audiobook.make_audiobook.QWEN_REF_AUDIO = Path("/Users/justinsm1max/Desktop/unible_harness/moneytong/릴스/my_ref.wav")
audiobook.make_audiobook.QWEN_REF_TEXT = "법인대표 인데 월급 얼마 세팅했어? 3백, 5백. 근데 그 숫자 제대로 계산하고 정한 것 맞아?"

from audiobook.make_audiobook import qwen_tts_synth

BRAIN_DIR = "/Users/justinsm1max/.gemini/antigravity/brain/42dac325-b75f-4607-8823-1a9e5a734931"
W, H = 1080, 1920

SCENES = [
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755638164.png",
        "voice": "5060 세대라면 무조건 보세요. 모르고 지나치면 평생 손해 보는 숨은 내 돈 300만 원, 확인하셨나요?",
        "effect": "zoom",
        "grayscale": False
    },
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755697844.jpg",
        "voice": "정부지원금, 기초연금. 조건도 복잡하고 서류도 많아서 포기하셨다고요? 신청 안 하면 나라에서는 절대 먼저 챙겨주지 않습니다.",
        "effect": "zoom_grayscale",
        "grayscale": True
    },
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755709706.jpg",
        "voice": "이제 머리 아프게 찾지 마세요. 머니통에서 5060 맞춤 혜택과 숨은 지원금 정보를 가장 쉽고 빠르게 짚어드립니다.",
        "effect": "zoom",
        "grayscale": False
    },
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755719334.png",
        "voice": "지금 당장 프로필 링크를 누르고, 내 계좌로 들어올 숨은 지원금을 확인해 보세요! 팔로우는 필수입니다.",
        "effect": "zoom",
        "grayscale": False
    }
]

def prepare_images():
    for i, s in enumerate(SCENES):
        img = Image.open(s["img"]).convert("RGBA")
        canvas = Image.new("RGBA", img.size, (255, 255, 255, 255))
        canvas.alpha_composite(img)
        img = canvas.convert("RGB")
        
        img_w, img_h = img.size
        target_ratio = W / H
        img_ratio = img_w / img_h
        
        if img_ratio > target_ratio:
            new_w = int(img_h * target_ratio)
            left = (img_w - new_w) // 2
            img = img.crop((left, 0, left + new_w, img_h))
        else:
            new_h = int(img_w / target_ratio)
            top = (img_h - new_h) // 2
            img = img.crop((0, top, img_w, top + new_h))
            
        img = img.resize((W, H), Image.Resampling.LANCZOS)
        
        if s["grayscale"]:
            img = img.convert("L").convert("RGB")
            
        out_path = f"scene_premium_{i+1}.png"
        img.save(out_path)
        s["processed_img"] = out_path

def generate_tts():
    for i, s in enumerate(SCENES):
        print(f"Generating premium voice clone for scene {i+1}...")
        out_path = f"scene_premium_{i+1}.wav"
        
        # [Zero-Defect] "5060"을 "오공육공"으로 명시적 치환하여 발음 에러 차단
        clean_voice = s["voice"].replace("5060", "오공육공")
        
        qwen_tts_synth(clean_voice, out_path, pace="fast", style="default")
        s["audio"] = out_path

def get_audio_duration(file_path):
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file_path]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, text=True)
    return float(res.stdout.strip())

def generate_ass_subtitles(index, text, duration):
    words = text.split()
    chunks = []
    curr = []
    for w in words:
        curr.append(w)
        if len(curr) >= 2 or (len(curr) == 1 and len(w) >= 5):
            chunks.append(" ".join(curr))
            curr = []
    if curr:
        chunks.append(" ".join(curr))
        
    chunk_dur = duration / len(chunks)
    
    # [Premium Design] 세련된 디자인 적용 (Outline 9, Shadow 6, Spacing 약간 축소)
    ass_header = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: CapCut,AppleSDGothicNeo,110,&H00FFFFFF,&H000000FF,&H00000000,&H99000000,-1,0,0,0,100,100,-2,0,1,9,6,5,10,10,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    def fmt_time(t):
        h = int(t / 3600)
        m = int((t % 3600) / 60)
        s = int(t % 60)
        cs = int((t * 100) % 100)
        return f"{h}:{m:02d}:{s:02d}.{cs:02d}"

    events = ""
    for i, c in enumerate(chunks):
        start = i * chunk_dur
        end = (i + 1) * chunk_dur
        
        # [Premium Color] 형광 노랑 대신 요즘 유행하는 웜 골드/머스타드 옐로우(&H002ECAFF) 사용
        color = "{\\c&H002ECAFF&}" if (i % 3 == 0 or any(char.isdigit() for char in c)) else "{\\c&HFFFFFF&}"
        
        # [Premium Animation] 캡컷의 트렌디한 '스프링 팝업' 효과 애니메이션 추가 (75% -> 100% 줌인 150ms)
        anim = "{\\fscx75\\fscy75\\t(0,150,\\fscx100\\fscy100)}"
        
        events += f"Dialogue: 0,{fmt_time(start)},{fmt_time(end)},CapCut,,0,0,0,,{anim}{color}{c}\n"
        
    ass_file = f"subtitles_premium_{index+1}.ass"
    with open(ass_file, "w") as f:
        f.write(ass_header + events)
    return ass_file

def build_video():
    videos = []
    for i, s in enumerate(SCENES):
        raw_dur = get_audio_duration(s["audio"])
        
        # [Zero-Defect] 오디오 컷오프(목소리 끊김) 방지를 위해 오디오 뒤에 0.4초 무음(apad) 추가
        padded_dur = raw_dur + 0.4 
        
        ass_file = generate_ass_subtitles(i, s["voice"], padded_dur)
        out_vid = f"scene_premium_{i+1}.mp4"
        
        cmd = [
            "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
            "-loop", "1", "-i", s["processed_img"],
            "-i", s["audio"],
            "-filter_complex", 
            f"[1:a]apad=pad_dur=0.4[a]; [0:v]zoompan=z='min(zoom+0.0015,1.2)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={int(padded_dur*30)}:s={W}x{H},ass={ass_file}[v]",
            "-map", "[v]", "-map", "[a]",
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
            "-shortest", out_vid
        ]
        print(f"Building premium video scene {i+1}...")
        subprocess.run(cmd, check=True)
        videos.append(out_vid)
        
    with open("concat_premium.txt", "w") as f:
        for v in videos:
            f.write(f"file '{v}'\n")
            
    final_out = f"{BRAIN_DIR}/moneytong_reels_premium_v4.mp4"
    print("Concatenating final premium video...")
    subprocess.run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
        "-f", "concat", "-safe", "0", "-i", "concat_premium.txt",
        "-c", "copy", final_out
    ], check=True)
    
    print(f"Done! Saved to {final_out}")

if __name__ == "__main__":
    prepare_images()
    generate_tts()
    build_video()
