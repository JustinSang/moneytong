import sys
sys.path.append("/Users/justinsm1max/Desktop/unible_harness")

import os
import asyncio
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import subprocess
import wave
import contextlib
from audiobook.make_audiobook import qwen_tts_synth

BRAIN_DIR = "/Users/justinsm1max/.gemini/antigravity/brain/42dac325-b75f-4607-8823-1a9e5a734931"
FONT_PATH = "/System/Library/Fonts/Supplemental/AppleSDGothicNeo.ttc"

SCENES = [
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755638164.png",
        "text1": "🚨 5060세대 주목!",
        "text2": "평생 손해보는 '이 돈' 300만 원?",
        "voice": "5060 세대라면 무조건 보세요. 모르고 지나치면 평생 손해 보는 숨은 내 돈 300만 원, 확인하셨나요?",
        "effect": "zoom",
        "grayscale": False
    },
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755697844.jpg",
        "text1": "복잡한 정부지원금...",
        "text2": "포기하셨나요?",
        "voice": "정부지원금, 기초연금. 조건도 복잡하고 서류도 많아서 포기하셨다고요? 신청 안 하면 나라에서는 절대 먼저 챙겨주지 않습니다.",
        "effect": "zoom_grayscale",
        "grayscale": True
    },
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755709706.jpg",
        "text1": "매일 업데이트되는 5060 맞춤 혜택",
        "text2": "👉 '머니통'",
        "voice": "이제 머리 아프게 찾지 마세요. 머니통에서 5060 맞춤 혜택과 숨은 지원금 정보를 가장 쉽고 빠르게 짚어드립니다.",
        "effect": "zoom",
        "grayscale": False
    },
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755719334.png",
        "text1": "프로필 링크 클릭하고",
        "text2": "숨은 지원금 확인! 👇",
        "voice": "지금 당장 프로필 링크를 누르고, 내 계좌로 들어올 숨은 지원금을 확인해 보세요! 팔로우는 필수입니다.",
        "effect": "zoom",
        "grayscale": False
    }
]

W, H = 1080, 1920

def get_font(size):
    # index 8 is Heavy/Black weight for AppleSDGothicNeo
    return ImageFont.truetype(FONT_PATH, size, index=8)

def draw_text_with_outline_and_shadow(draw, x, y, text, font, text_color, outline_width=6):
    # shadow
    shadow_offset = 8
    for dx in range(-outline_width, outline_width+1):
        for dy in range(-outline_width, outline_width+1):
            if dx*dx + dy*dy > outline_width*outline_width:
                continue
            draw.text((x+dx + shadow_offset, y+dy + shadow_offset), text, font=font, fill=(0,0,0, 150), anchor="mm")
            
    # outline
    for dx in range(-outline_width, outline_width+1):
        for dy in range(-outline_width, outline_width+1):
            if dx*dx + dy*dy > outline_width*outline_width:
                continue
            draw.text((x+dx, y+dy), text, font=font, fill=(0,0,0, 255), anchor="mm")
            
    # text
    draw.text((x, y), text, font=font, fill=text_color, anchor="mm")

def prepare_images():
    for i, s in enumerate(SCENES):
        print(f"Processing image {i+1}...")
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
            
        draw = ImageDraw.Draw(img, "RGBA")
        font = get_font(85)
        
        # Draw subtitles with pure modern style (no dim box, just outline + shadow)
        # Line 1: Yellow
        draw_text_with_outline_and_shadow(draw, W//2, H - 600, s["text1"], font, (255, 220, 0))
        # Line 2: White
        draw_text_with_outline_and_shadow(draw, W//2, H - 480, s["text2"], font, (255, 255, 255))
        
        out_path = f"scene_{i+1}.png"
        img.save(out_path)
        s["processed_img"] = out_path

def generate_tts():
    for i, s in enumerate(SCENES):
        print(f"Generating Qwen TTS {i+1}...")
        out_path = f"scene_{i+1}.wav"
        # Use our local LLM-based TTS (sounds incredibly natural, non-robotic)
        qwen_tts_synth(s["voice"], out_path, pace="fast", style="default")
        s["audio"] = out_path

def get_audio_duration(file_path):
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file_path]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, text=True)
    return float(result.stdout.strip())

def build_video():
    videos = []
    for i, s in enumerate(SCENES):
        dur = get_audio_duration(s["audio"]) + 0.3
        print(f"Scene {i+1} duration: {dur:.2f}s")
        out_vid = f"scene_{i+1}.mp4"
        
        cmd = [
            "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
            "-loop", "1", "-i", s["processed_img"],
            "-i", s["audio"],
            "-filter_complex", f"[0:v]zoompan=z='min(zoom+0.001,1.1)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={int(dur*30)}:s={W}x{H}[v]",
            "-map", "[v]", "-map", "1:a",
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
            "-shortest", out_vid
        ]
        subprocess.run(cmd, check=True)
        videos.append(out_vid)
        
    with open("concat.txt", "w") as f:
        for v in videos:
            f.write(f"file '{v}'\n")
            
    final_out = f"{BRAIN_DIR}/moneytong_reels_pro.mp4"
    print("Concatenating...")
    subprocess.run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
        "-f", "concat", "-safe", "0", "-i", "concat.txt",
        "-c", "copy", final_out
    ], check=True)
    
    print(f"Done! Saved to {final_out}")

def main():
    prepare_images()
    generate_tts()
    build_video()

if __name__ == "__main__":
    main()
