import os
import subprocess

AUDIO = "/Users/justinsm1max/Desktop/unible_harness/moneytong/audio_master.mp3"
OUT_VIDEO_DIR = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/videos"
IMG_DIR = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics"

os.makedirs(OUT_VIDEO_DIR, exist_ok=True)

# 5 Chapter Images (1920x1080)
CH_IMAGES = [
    f"{IMG_DIR}/ch1_master.jpg",
    f"{IMG_DIR}/ch2_stairs_infographic_1787479574342.jpg",
    f"{IMG_DIR}/ch3_master.jpg",
    f"{IMG_DIR}/ch4_gate_infographic_1787479624106.jpg",
    f"{IMG_DIR}/ch5_defense_infographic_1787479644416.jpg"
]

# Chapter Durations (seconds)
# 00:00~03:45 (225s), 03:45~08:20 (275s), 08:20~13:10 (290s), 13:10~17:30 (260s), 17:30~20:10 (160s)
DURATIONS = [225, 275, 290, 260, 160]

def render_longform():
    output_path = f"{OUT_VIDEO_DIR}/[머니통_5060_라디오_제1화]_2026_연금_완벽_가이드_롱폼.mp4"
    
    # Create input args for 5 chapter images
    input_args = []
    for img in CH_IMAGES:
        input_args.extend(["-loop", "1", "-t", "1210", "-i", img])
    input_args.extend(["-i", AUDIO])
    
    # Filter complex to switch images at timestamps + showwaves overlay
    # [0:v] for 0-225s, [1:v] for 225-500s, [2:v] for 500-790s, [3:v] for 790-1050s, [4:v] for 1050-1210s
    filter_complex = (
        "[0:v]trim=duration=225,setpts=PTS-STARTPTS[v0];"
        "[1:v]trim=duration=275,setpts=PTS-STARTPTS[v1];"
        "[2:v]trim=duration=290,setpts=PTS-STARTPTS[v2];"
        "[3:v]trim=duration=260,setpts=PTS-STARTPTS[v3];"
        "[4:v]trim=duration=160,setpts=PTS-STARTPTS[v4];"
        "[v0][v1][v2][v3][v4]concat=n=5:v=1:a=0[base_v];"
        "[5:a]showwaves=s=1920x120:colors=0xFFD700|0xFF8C00:mode=cline,format=yuva420p[wave];"
        "[base_v][wave]overlay=0:H-140,format=yuv420p[outv]"
    )
    
    cmd = [
        "ffmpeg", "-y",
        *input_args,
        "-filter_complex", filter_complex,
        "-map", "[outv]", "-map", "5:a",
        "-c:v", "h264_videotoolbox", "-b:v", "4M",
        "-c:a", "aac", "-b:a", "192k",
        "-t", "1210",
        output_path
    ]
    
    print("Rendering 20-minute Longform Video with 5 Chapter Infographics...")
    subprocess.run(cmd, check=True)
    print("Longform rendering completed:", output_path)

def render_shorts():
    shorts_data = [
        {
            "num": 1,
            "title": "국민연금_일하면_깎일까_308만원_진실",
            "img": f"{IMG_DIR}/shorts_01_vertical_master.jpg",
            "start": "03:45",
            "duration": 55
        },
        {
            "num": 2,
            "title": "조기연금_vs_연기연금_손익분기점_78세",
            "img": f"{IMG_DIR}/shorts_02_vertical_master.jpg",
            "start": "08:20",
            "duration": 55
        },
        {
            "num": 3,
            "title": "부부_기초연금_20퍼센트_감액_방어법",
            "img": f"{IMG_DIR}/shorts_03_vertical_master.jpg",
            "start": "17:30",
            "duration": 55
        }
    ]
    
    for s in shorts_data:
        output_path = f"{OUT_VIDEO_DIR}/[머니통_숏폼_{s['num']}]_{s['title']}.mp4"
        cmd = [
            "ffmpeg", "-y",
            "-loop", "1", "-i", s['img'],
            "-ss", s['start'], "-t", str(s['duration']), "-i", AUDIO,
            "-filter_complex",
            "[1:a]showwaves=s=1080x100:colors=0xFF6B81|0xFFD700:mode=cline,format=yuva420p[wave];"
            "[0:v]scale=1080:1920[bg];"
            "[bg][wave]overlay=0:H-120,format=yuv420p[outv]",
            "-map", "[outv]", "-map", "1:a",
            "-c:v", "h264_videotoolbox", "-b:v", "3M",
            "-c:a", "aac", "-b:a", "192k",
            "-t", str(s['duration']),
            output_path
        ]
        print(f"Rendering Vertical Shortform #{s['num']} ({s['title']})...")
        subprocess.run(cmd, check=True)
        print(f"Shortform #{s['num']} completed:", output_path)

if __name__ == '__main__':
    render_shorts()
    print("ALL VERTICAL SHORTS RENDERING 100% COMPLETE!")
