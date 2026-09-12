import os
import asyncio
import edge_tts
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import subprocess

BRAIN_DIR = "/Users/justinsm1max/.gemini/antigravity/brain/42dac325-b75f-4607-8823-1a9e5a734931"
FONT_PATH = "/System/Library/AssetsV2/com_apple_MobileAsset_Font8/7a0b5c0f3c1d41c4c52a33343496c9c65ad52c50.asset/AssetData/NanumGothic.ttc"

SCENES = [
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755638164.png",
        "text": "🚨 5060세대 주목!\n평생 손해보는 '이 돈' 300만 원?",
        "voice": "5060 세대라면 무조건 보세요. 모르고 지나치면 평생 손해 보는 '숨은 내 돈' 300만 원, 확인하셨나요?",
        "effect": "zoom",
        "grayscale": False
    },
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755697844.jpg",
        "text": "복잡한 정부지원금...\n포기하셨나요?",
        "voice": "정부지원금, 기초연금... 조건도 복잡하고 서류도 많아서 포기하셨다고요? 신청 안 하면 나라에서는 절대 먼저 챙겨주지 않습니다.",
        "effect": "zoom_grayscale",
        "grayscale": True
    },
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755709706.jpg",
        "text": "매일 업데이트되는 5060 맞춤 혜택\n👉 '머니통'",
        "voice": "이제 머리 아프게 찾지 마세요. '머니통'에서 5060 맞춤 혜택과 숨은 지원금 정보를 가장 쉽고 빠르게 짚어드립니다.",
        "effect": "zoom",
        "grayscale": False
    },
    {
        "img": f"{BRAIN_DIR}/.user_uploaded/media_1787755719334.png",
        "text": "프로필 링크 클릭하고\n숨은 지원금 확인! 👇",
        "voice": "지금 당장 프로필 링크를 누르고, 내 계좌로 들어올 숨은 지원금을 확인해 보세요! 팔로우는 필수입니다.",
        "effect": "zoom",
        "grayscale": False
    }
]

W, H = 1080, 1920
VOICE_NAME = "ko-KR-InJoonNeural"

def get_font(size):
    return ImageFont.truetype(FONT_PATH, size, index=2) # ExtraBold

def draw_text_with_outline(draw, x, y, text, font, text_color, outline_color, outline_width=4):
    for dx in range(-outline_width, outline_width+1):
        for dy in range(-outline_width, outline_width+1):
            if dx*dx + dy*dy > outline_width*outline_width:
                continue
            draw.text((x+dx, y+dy), text, font=font, fill=outline_color, anchor="mm", align="center")
    draw.text((x, y), text, font=font, fill=text_color, anchor="mm", align="center")

def prepare_images():
    for i, s in enumerate(SCENES):
        print(f"Processing image {i+1}...")
        img = Image.open(s["img"]).convert("RGBA")
        
        # Create a new white background canvas (prevent transparency issues with RGBA to RGB later)
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
        font = get_font(70)
        
        # Semi-transparent background for text (dim box)
        bbox = draw.multiline_textbbox((W//2, H - 400), s["text"], font=font, align="center", anchor="mm")
        pad_x, pad_y = 60, 40
        draw.rounded_rectangle([bbox[0]-pad_x, bbox[1]-pad_y, bbox[2]+pad_x, bbox[3]+pad_y], radius=30, fill=(0, 0, 0, 190))
        
        # Text with outline
        draw_text_with_outline(draw, W//2, H - 400, s["text"], font, (255, 255, 255), (0, 0, 0), outline_width=5)
        
        out_path = f"scene_{i+1}.png"
        img.save(out_path)
        s["processed_img"] = out_path

async def generate_tts():
    for i, s in enumerate(SCENES):
        print(f"Generating TTS {i+1}...")
        out_path = f"scene_{i+1}.mp3"
        communicate = edge_tts.Communicate(s["voice"], VOICE_NAME, rate="+10%") # slightly fast for reels
        await communicate.save(out_path)
        s["audio"] = out_path

def get_audio_duration(file_path):
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file_path]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, text=True)
    return float(result.stdout.strip())

def build_video():
    videos = []
    for i, s in enumerate(SCENES):
        dur = get_audio_duration(s["audio"]) + 0.6 # padding
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
            
    final_out = f"{BRAIN_DIR}/moneytong_reels_final.mp4"
    print("Concatenating...")
    subprocess.run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
        "-f", "concat", "-safe", "0", "-i", "concat.txt",
        "-c", "copy", final_out
    ], check=True)
    
    print(f"Done! Saved to {final_out}")
    
    # Clean up intermediate files
    for v in videos:
        os.remove(v)
    for i in range(1, 5):
        if os.path.exists(f"scene_{i}.png"): os.remove(f"scene_{i}.png")
        if os.path.exists(f"scene_{i}.mp3"): os.remove(f"scene_{i}.mp3")

async def main():
    prepare_images()
    await generate_tts()
    build_video()

if __name__ == "__main__":
    asyncio.run(main())
