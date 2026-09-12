import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONT_BOLD = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
FONT_MEDIUM = "/System/Library/Fonts/AppleSDGothicNeo.ttc"

def get_font(size, bold=True):
    return ImageFont.truetype(FONT_BOLD, size, index=1 if bold else 0)

OUT_DIR = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics"
BRAIN_DIR = "/Users/justinsm1max/.gemini/antigravity/brain/42dac325-b75f-4607-8823-1a9e5a734931"

# 1. Shorts 1 Canvas (Direct from 9:16 generated image)
def make_shorts_1():
    src = f"{BRAIN_DIR}/shorts_01_vertical_infographic_1787486316902.jpg"
    img = Image.open(src).resize((1080, 1920), Image.Resampling.LANCZOS)
    out_p = f"{OUT_DIR}/shorts_01_vertical_master.jpg"
    img.save(out_p, quality=98)
    img.save(f"{BRAIN_DIR}/shorts_01_vertical_master.jpg", quality=98)
    print("Shorts 1 Master ready:", out_p)

# 2. Shorts 2 Canvas (1080x1920 vertical storyboard)
def make_shorts_2():
    # Warm cream background
    canvas = Image.new("RGB", (1080, 1920), (255, 248, 240))
    draw = ImageDraw.Draw(canvas)
    
    # Top Category Badge & Main Title
    draw.rounded_rectangle([320, 80, 760, 150], radius=35, fill=(244, 63, 94))
    draw.text((540, 115), "5060 은퇴 재테크 핵심", font=get_font(28, True), fill=(255, 255, 255), anchor="mm")
    
    draw.text((540, 220), "조기연금 VS 연기연금", font=get_font(56, True), fill=(30, 41, 59), anchor="mm")
    draw.text((540, 290), "언제 받는 게 나에게 가장 이득일까?", font=get_font(36, True), fill=(225, 29, 72), anchor="mm")
    
    # Center: Uncropped Flashcard 2 Image (Rabbit vs Turtle)
    fc2 = Image.open(f"{BRAIN_DIR}/flashcard_02_doodle_1787479475893.jpg").resize((920, 920), Image.Resampling.LANCZOS)
    # Add shadow/card container
    draw.rounded_rectangle([70, 360, 1010, 1300], radius=24, fill=(255, 255, 255), outline=(255, 200, 120), width=3)
    canvas.paste(fc2, (80, 370))
    
    # Bottom 3 Takeaway Cards
    cards = [
        ("1. 78세 이전 사망 시", "조기연금(-30%) 총 수령액 압도적 이득!"),
        ("2. 84세 이상 장수 시", "연기연금(+36%) 매월 수령액 최고 극대화!"),
        ("3. 나의 최적 수령 시점", "머니통 3초 연금계산기에서 무료 확인!")
    ]
    
    y = 1330
    for title, desc in cards:
        draw.rounded_rectangle([80, y, 1000, y + 110], radius=18, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
        draw.text((120, y + 38), title, font=get_font(28, True), fill=(225, 29, 72))
        draw.text((120, y + 74), desc, font=get_font(24, False), fill=(51, 65, 85))
        y += 130
        
    out_p = f"{OUT_DIR}/shorts_02_vertical_master.jpg"
    canvas.save(out_p, quality=98)
    canvas.save(f"{BRAIN_DIR}/shorts_02_vertical_master.jpg", quality=98)
    print("Shorts 2 Master ready:", out_p)

# 3. Shorts 3 Canvas (1080x1920 vertical storyboard)
def make_shorts_3():
    canvas = Image.new("RGB", (1080, 1920), (240, 253, 250))
    draw = ImageDraw.Draw(canvas)
    
    # Top Category Badge & Main Title
    draw.rounded_rectangle([320, 80, 760, 150], radius=35, fill=(13, 148, 136))
    draw.text((540, 115), "부부 연금 방어 필살기", font=get_font(28, True), fill=(255, 255, 255), anchor="mm")
    
    draw.text((540, 220), "부부 기초연금 20% 감액", font=get_font(56, True), fill=(30, 41, 59), anchor="mm")
    draw.text((540, 290), "40% 깎인다? NO! 월 56만원 사수법", font=get_font(36, True), fill=(13, 148, 136), anchor="mm")
    
    # Center: Uncropped Flashcard 3 Image (Couple Defense Shield)
    fc3 = Image.open(f"{BRAIN_DIR}/flashcard_03_doodle_1787479512605.jpg").resize((920, 920), Image.Resampling.LANCZOS)
    draw.rounded_rectangle([70, 360, 1010, 1300], radius=24, fill=(255, 255, 255), outline=(45, 212, 191), width=3)
    canvas.paste(fc3, (80, 370))
    
    # Bottom 3 Takeaway Cards
    cards = [
        ("1. 부부 합산 수령액", "월 최대 559,520원 100% 안전 수령"),
        ("2. 국민연금 연계 감액", "월 60만원 이하 구간이면 감액 없음!"),
        ("3. 116만원 소득공제", "근로소득 있으면 추가 공제로 전액 사수!")
    ]
    
    y = 1330
    for title, desc in cards:
        draw.rounded_rectangle([80, y, 1000, y + 110], radius=18, fill=(255, 255, 255), outline=(204, 251, 241), width=2)
        draw.text((120, y + 38), title, font=get_font(28, True), fill=(13, 148, 136))
        draw.text((120, y + 74), desc, font=get_font(24, False), fill=(51, 65, 85))
        y += 130
        
    out_p = f"{OUT_DIR}/shorts_03_vertical_master.jpg"
    canvas.save(out_p, quality=98)
    canvas.save(f"{BRAIN_DIR}/shorts_03_vertical_master.jpg", quality=98)
    print("Shorts 3 Master ready:", out_p)

if __name__ == '__main__':
    make_shorts_1()
    make_shorts_2()
    make_shorts_3()
