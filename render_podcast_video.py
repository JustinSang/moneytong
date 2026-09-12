import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

def create_background():
    # 1920x1080 background
    bg = Image.new('RGB', (1920, 1080), color=(10, 20, 40)) # Dark navy
    draw = ImageDraw.Draw(bg)
    
    # Try to load AppleSDGothicNeo
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/AppleSDGothicNeo.ttc", 80)
        font_subtitle = ImageFont.truetype("/System/Library/Fonts/AppleSDGothicNeo.ttc", 50)
    except:
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()

    # Draw Title
    title = "머니통 5060 돈 되는 라디오 (MoneyTong)"
    # Using textbbox to center
    bbox = draw.textbbox((0, 0), title, font=font_title)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((1920-w)/2, 200), title, font=font_title, fill=(255, 215, 0)) # Gold/Yellow

    subtitle = "2026 국민연금 감액 없이 일하는 법 & 기초연금 100% 수령 전략"
    bbox = draw.textbbox((0, 0), subtitle, font=font_subtitle)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((1920-w)/2, 350), subtitle, font=font_subtitle, fill=(255, 255, 255))
    
    # Save
    bg.save('podcast_bg.jpg')
    print("Background created.")

def render_longform():
    audio = "/Users/justinsm1max/Desktop/unible_harness/music/podcasts/moneytong_pension_podcast_2026.mp3"
    output = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/videos/moneytong_longform.mp4"
    os.makedirs(os.path.dirname(output), exist_ok=True)
    
    # We will use drawtext for chapters
    # Chapters:
    # 00:00 (0s) - 03:45 (225s): 기초연금 vs 국민연금 한눈에 비교
    # 03:45 (225s) - 08:20 (500s): 2026 국민연금 감액 없이 일하는 법 (월소득 A값 308만원)
    # 08:20 (500s) - 13:10 (790s): 조기노령연금 vs 연기연금 손익분기점 (7.2% 가산 vs 6% 감액)
    # 13:10 (790s) - 17:30 (1050s): 기초연금 단독 34.9만원·부부 55.9만원 100% 수령 요건
    # 17:30 (1050s) - End: 부부 동시 수령 시 20% 감액 방지 및 연계 감액 꿀팁

    chapters = [
        {"start": 0, "end": 225, "text": "현재 진행 중: 1. 기초연금 vs 국민연금 한눈에 비교"},
        {"start": 225, "end": 500, "text": "현재 진행 중: 2. 2026 국민연금 감액 없이 일하는 법 (월소득 A값 308만원)"},
        {"start": 500, "end": 790, "text": "현재 진행 중: 3. 조기노령연금 vs 연기연금 손익분기점"},
        {"start": 790, "end": 1050, "text": "현재 진행 중: 4. 기초연금 100% 수령 요건"},
        {"start": 1050, "end": 9999, "text": "현재 진행 중: 5. 부부 동시 수령 시 20% 감액 방지 꿀팁"}
    ]

    font_path = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
    
    drawtext_filters = []
    for c in chapters:
        # replace colons if any, though we don't have them in our texts
        safe_text = c['text'].replace(":", "\\:").replace("'", "\\'")
        f = f"drawtext=fontfile='{font_path}':text='{safe_text}':enable='between(t,{c['start']},{c['end']})':x=(w-text_w)/2:y=800:fontsize=48:fontcolor=white:box=1:boxcolor=black@0.5:boxborderw=10"
        drawtext_filters.append(f)
        
    drawtext_str = ",".join(drawtext_filters)

    cmd = [
        "ffmpeg", "-y",
        "-loop", "1", "-i", "podcast_bg.jpg",
        "-i", audio,
        "-filter_complex",
        f"[1:a]showwaves=s=1920x200:colors=0x00FF00|0x00FFFF:mode=cline,format=yuva420p[wave];[0:v][wave]overlay=0:H-300[v1];[v1]{drawtext_str},format=yuv420p[vout]",
        "-map", "[vout]", "-map", "1:a",
        "-c:v", "h264_videotoolbox", "-b:v", "3M",
        "-c:a", "copy",
        "-shortest",
        output
    ]
    print("Running ffmpeg for longform...")
    subprocess.run(cmd, check=True)
    print("Longform done:", output)

def render_shortforms():
    audio = "/Users/justinsm1max/Desktop/unible_harness/music/podcasts/moneytong_pension_podcast_2026.mp3"
    shorts = [
        {"id": 1, "start": "03:45", "duration": 55, "title": "국민연금 받으면서 일하면\n무조건 깎일까?"},
        {"id": 2, "start": "08:20", "duration": 55, "title": "조기연금 vs 연기연금\n손해 안 보는 나이는?"},
        {"id": 3, "start": "17:30", "duration": 55, "title": "부부 둘 다 기초연금 신청하면\n20% 깎인다?"}
    ]
    
    font_path = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
    
    for s in shorts:
        out_bg = f"short_bg_{s['id']}.jpg"
        # 1080x1920 background
        bg = Image.new('RGB', (1080, 1920), color=(20, 10, 30))
        draw = ImageDraw.Draw(bg)
        try:
            font_title = ImageFont.truetype("/System/Library/Fonts/AppleSDGothicNeo.ttc", 80)
            font_subtitle = ImageFont.truetype("/System/Library/Fonts/AppleSDGothicNeo.ttc", 60)
        except:
            font_title = ImageFont.load_default()
            font_subtitle = ImageFont.load_default()

        # Draw Top Text
        draw.text((100, 300), s['title'], font=font_title, fill=(255, 215, 0), align="center")
        draw.text((100, 1500), "머니통 5060 라디오", font=font_subtitle, fill=(200, 200, 200), align="center")
        
        bg.save(out_bg)
        
        output = f"/Users/justinsm1max/Desktop/unible_harness/moneytong/public/videos/moneytong_short_{s['id']}.mp4"
        os.makedirs(os.path.dirname(output), exist_ok=True)
        
        cmd = [
            "ffmpeg", "-y",
            "-loop", "1", "-i", out_bg,
            "-ss", s['start'], "-t", str(s['duration']), "-i", audio,
            "-filter_complex",
            f"[1:a]showwaves=s=1080x300:colors=0xFFD700|0xFF8C00:mode=cline,format=yuva420p[wave];[0:v][wave]overlay=0:H/2-150[vout]",
            "-map", "[vout]", "-map", "1:a",
            "-c:v", "h264_videotoolbox", "-b:v", "2M",
            "-c:a", "aac", "-b:a", "192k",
            "-t", str(s['duration']),
            output
        ]
        print(f"Running ffmpeg for shortform {s['id']}...")
        subprocess.run(cmd, check=True)
        print(f"Shortform {s['id']} done:", output)

def create_cardnews():
    cards = [
        {"id": 1, "text": "2026 연금 완벽 가이드\n\n머니통 5060 라디오"},
        {"id": 2, "text": "일하면서 연금\n안 깎이는 법\n\n월소득 A값 308만원 주목!"},
        {"id": 3, "text": "조기연금 vs 연기연금\n손익분기점 총정리\n\n내게 유리한 선택은?"},
        {"id": 4, "text": "기초연금\n부부 감액 방어법\n\n20% 깎이지 마세요!"}
    ]
    
    for c in cards:
        bg = Image.new('RGB', (1080, 1080), color=(10, 40, 60))
        draw = ImageDraw.Draw(bg)
        try:
            font = ImageFont.truetype("/System/Library/Fonts/AppleSDGothicNeo.ttc", 80)
        except:
            font = ImageFont.load_default()
            
        bbox = draw.textbbox((0, 0), c['text'], font=font)
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
        draw.text(((1080-w)/2, (1080-h)/2), c['text'], font=font, fill=(255, 255, 255), align="center")
        
        out = f"/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/cardnews_0{c['id']}.jpg"
        os.makedirs(os.path.dirname(out), exist_ok=True)
        bg.save(out)
        print("Cardnews done:", out)

if __name__ == '__main__':
    create_background()
    create_cardnews()
    render_shortforms()
    render_longform()
