import os
import subprocess

font = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
audio = "/Users/justinsm1max/Desktop/unible_harness/music/podcasts/moneytong_pension_podcast_2026.mp3"

def run_cmd(cmd):
    print("Running:", " ".join(cmd))
    subprocess.run(cmd, check=True)

def safe_text(txt):
    return txt.replace(":", "\\:").replace("'", "\\'").replace("%", "\\\\%")

def generate_backgrounds():
    # Longform BG (1920x1080)
    cmd = [
        "ffmpeg", "-y", "-f", "lavfi", "-i", "color=c=0x0a1428:s=1920x1080", "-frames:v", "1",
        "-filter_complex",
        f"[0:v]drawtext=fontfile='{font}':text='머니통 5060 돈 되는 라디오 (MoneyTong)':fontcolor=0xFFD700:fontsize=80:x=(w-text_w)/2:y=200,"
        f"drawtext=fontfile='{font}':text='2026 국민연금 감액 없이 일하는 법 & 기초연금 100\\\\% 수령 전략':fontcolor=white:fontsize=50:x=(w-text_w)/2:y=350",
        "podcast_bg.jpg"
    ]
    run_cmd(cmd)

    # Short BG (1080x1920)
    shorts = [
        (1, ["국민연금 받으면서 일하면", "무조건 깎일까?"]),
        (2, ["조기연금 vs 연기연금", "손해 안 보는 나이는?"]),
        (3, ["부부 둘 다 기초연금 신청하면", "20\\\\% 깎인다?"])
    ]
    for idx, lines in shorts:
        filters = []
        base_y = 300
        for i, line in enumerate(lines):
            filters.append(f"drawtext=fontfile='{font}':text='{safe_text(line)}':fontcolor=0xFFD700:fontsize=80:x=(w-text_w)/2:y={base_y + i*100}")
        filters.append(f"drawtext=fontfile='{font}':text='머니통 5060 라디오':fontcolor=0xC8C8C8:fontsize=60:x=(w-text_w)/2:y=1500")
        
        cmd = [
            "ffmpeg", "-y", "-f", "lavfi", "-i", "color=c=0x140a1e:s=1080x1920", "-frames:v", "1",
            "-filter_complex", "[0:v]" + ",".join(filters),
            f"short_bg_{idx}.jpg"
        ]
        run_cmd(cmd)

def generate_cardnews():
    cards = [
        (1, ["2026 연금 완벽 가이드", "", "머니통 5060 라디오"]),
        (2, ["일하면서 연금", "안 깎이는 법", "", "월소득 A값 308만원 주목!"]),
        (3, ["조기연금 vs 연기연금", "손익분기점 총정리", "", "내게 유리한 선택은?"]),
        (4, ["기초연금", "부부 감액 방어법", "", "20\\\\% 깎이지 마세요!"])
    ]
    os.makedirs("public/images", exist_ok=True)
    for idx, lines in cards:
        filters = []
        # Total height approx len(lines) * 100
        start_y = (1080 - len(lines)*100) // 2
        for i, line in enumerate(lines):
            if not line: continue
            filters.append(f"drawtext=fontfile='{font}':text='{safe_text(line)}':fontcolor=white:fontsize=80:x=(w-text_w)/2:y={start_y + i*100}")
            
        cmd = [
            "ffmpeg", "-y", "-f", "lavfi", "-i", "color=c=0x0a283c:s=1080x1080", "-frames:v", "1",
            "-filter_complex", "[0:v]" + ",".join(filters),
            f"public/images/cardnews_0{idx}.jpg"
        ]
        run_cmd(cmd)

def render_shorts():
    os.makedirs("public/videos", exist_ok=True)
    shorts_meta = [
        (1, "03:45", 55),
        (2, "08:20", 55),
        (3, "17:30", 55)
    ]
    for idx, start, duration in shorts_meta:
        cmd = [
            "ffmpeg", "-y",
            "-loop", "1", "-i", f"short_bg_{idx}.jpg",
            "-ss", start, "-t", str(duration), "-i", audio,
            "-filter_complex",
            "[1:a]showwaves=s=1080x300:colors=0xFFD700|0xFF8C00:mode=cline,format=yuva420p[wave];[0:v][wave]overlay=0:H/2-150:shortest=1[vout]",
            "-map", "[vout]", "-map", "1:a",
            "-c:v", "h264_videotoolbox", "-b:v", "2M",
            "-c:a", "aac", "-b:a", "192k",
            "-t", str(duration),
            f"public/videos/moneytong_short_{idx}.mp4"
        ]
        run_cmd(cmd)

def render_longform():
    chapters = [
        (0, 225, "현재 진행 중: 1. 기초연금 vs 국민연금 한눈에 비교"),
        (225, 500, "현재 진행 중: 2. 2026 국민연금 감액 없이 일하는 법"),
        (500, 790, "현재 진행 중: 3. 조기노령연금 vs 연기연금 손익분기점"),
        (790, 1050, "현재 진행 중: 4. 기초연금 100\\\\% 수령 요건"),
        (1050, 9999, "현재 진행 중: 5. 부부 동시 수령 시 20\\\\% 감액 방지 꿀팁")
    ]
    
    draw_filters = []
    for i, (start, end, text) in enumerate(chapters):
        draw_filters.append(f"drawtext=fontfile='{font}':text='{safe_text(text)}':enable='between(t,{start},{end})':x=(w-text_w)/2:y=800:fontsize=48:fontcolor=white:box=1:boxcolor=black@0.5:boxborderw=10")
    
    chain = ",".join(draw_filters)
    
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1", "-i", "podcast_bg.jpg",
        "-i", audio,
        "-filter_complex",
        f"[1:a]showwaves=s=1920x200:colors=0x00FF00|0x00FFFF:mode=cline,format=yuva420p[wave];[0:v][wave]overlay=0:H-300[v1];[v1]{chain},format=yuv420p[vout]",
        "-map", "[vout]", "-map", "1:a",
        "-c:v", "h264_videotoolbox", "-b:v", "3M",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        "public/videos/moneytong_longform.mp4"
    ]
    run_cmd(cmd)

if __name__ == '__main__':
    print("Generating assets...")
    generate_backgrounds()
    generate_cardnews()
    print("Rendering shorts...")
    render_shorts()
    print("Rendering longform...")
    render_longform()
    print("Done!")
