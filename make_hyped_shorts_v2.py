import os
from PIL import Image, ImageDraw, ImageFont

FONT_EXTRA_BOLD = "/System/Library/AssetsV2/com_apple_MobileAsset_Font8/7a0b5c0f3c1d41c4c52a33343496c9c65ad52c50.asset/AssetData/NanumGothic.ttc"
FONT_SANS = "/System/Library/Fonts/AppleSDGothicNeo.ttc"

def get_title_font(size):
    try:
        return ImageFont.truetype(FONT_EXTRA_BOLD, size, index=0)
    except:
        return ImageFont.truetype(FONT_SANS, size, index=6)

def get_body_font(size, bold=True):
    return ImageFont.truetype(FONT_SANS, size, index=6 if bold else 2)

def draw_3d_text(draw, pos, text, font, fill_color, outline_color=(255, 255, 255), shadow_color=(20, 20, 20), outline_w=4, shadow_offset=(4, 5), anchor="mm"):
    x, y = pos
    sx, sy = shadow_offset
    # 1. Shadow
    draw.text((x + sx, y + sy), text, font=font, fill=shadow_color, anchor=anchor)
    # 2. Outline (Sticker effect)
    for dx in range(-outline_w, outline_w + 1):
        for dy in range(-outline_w, outline_w + 1):
            if dx != 0 or dy != 0:
                draw.text((x + dx, y + dy), text, font=font, fill=outline_color, anchor=anchor)
    # 3. Main Text
    draw.text((x, y), text, font=font, fill=fill_color, anchor=anchor)

OUT_DIR = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics"
BRAIN_DIR = "/Users/justinsm1max/.gemini/antigravity/brain/42dac325-b75f-4607-8823-1a9e5a734931"

def build_shorts_2():
    canvas = Image.new("RGB", (1080, 1920), (255, 248, 238))
    draw = ImageDraw.Draw(canvas)
    
    # 1. Top Graphic Badge (Pop-art Flame Banner)
    draw.rounded_rectangle([305, 65, 785, 145], radius=40, fill=(30, 30, 30)) # shadow
    draw.rounded_rectangle([300, 60, 780, 140], radius=40, fill=(255, 71, 87), outline=(255, 255, 255), width=4)
    draw.text((540, 100), "5060 은퇴 필수 체크", font=get_body_font(32, True), fill=(255, 255, 255), anchor="mm")
    
    # 2. Main Title (Huge 3D Pop Typography)
    draw_3d_text(draw, (540, 205), "조기연금 VS 연기연금", get_title_font(64), (30, 41, 59), (255, 255, 255), (15, 23, 42), 6, (4, 6))
    draw_3d_text(draw, (540, 280), "언제 받아야 내 돈을 최대로 지킬까?", get_title_font(38), (225, 29, 72), (255, 255, 255), (15, 23, 42), 4, (3, 4))
    
    # 3. Center Illustration Frame (Comic Polaroid with Washi Tape)
    fc2 = Image.open(f"{BRAIN_DIR}/flashcard_02_doodle_1787479475893.jpg").resize((920, 920), Image.Resampling.LANCZOS)
    draw.rounded_rectangle([75, 345, 1005, 1275], radius=28, fill=(30, 30, 30)) # shadow
    draw.rounded_rectangle([70, 340, 1000, 1270], radius=28, fill=(255, 255, 255), outline=(255, 180, 50), width=5)
    canvas.paste(fc2, (75, 345))
    
    # Washi tape decorations
    draw.polygon([(60, 330), (170, 305), (180, 345), (70, 370)], fill=(255, 107, 129))
    draw.polygon([(900, 305), (1010, 330), (1000, 370), (890, 345)], fill=(56, 189, 248))

    # 4. Bottom 3 Storytelling Infographic Cards (High Contrast & Bold Typography)
    # Card 1: Coral Red Pop Card
    y1 = 1310
    draw.rounded_rectangle([75, y1 + 6, 1005, y1 + 146], radius=22, fill=(30, 30, 30)) # shadow
    draw.rounded_rectangle([70, y1, 1000, y1 + 140], radius=22, fill=(255, 241, 242), outline=(244, 63, 94), width=4)
    # Tag Badge
    draw.rounded_rectangle([95, y1 + 16, 380, y1 + 64], radius=14, fill=(244, 63, 94))
    draw.text((237, y1 + 40), "78세 이전 사망 시", font=get_body_font(24, True), fill=(255, 255, 255), anchor="mm")
    # Punchline
    draw.text((105, y1 + 98), "조기연금(-30%) 총 수령액 압도적 이득!", font=get_title_font(34), fill=(225, 29, 72), anchor="lm")

    # Card 2: Golden Yellow Pop Card
    y2 = 1480
    draw.rounded_rectangle([75, y2 + 6, 1005, y2 + 146], radius=22, fill=(30, 30, 30))
    draw.rounded_rectangle([70, y2, 1000, y2 + 140], radius=22, fill=(254, 252, 232), outline=(234, 179, 8), width=4)
    draw.rounded_rectangle([95, y2 + 16, 380, y2 + 64], radius=14, fill=(202, 138, 4))
    draw.text((237, y2 + 40), "84세 이상 장수 시", font=get_body_font(24, True), fill=(255, 255, 255), anchor="mm")
    draw.text((105, y2 + 98), "연기연금(+36%) 매월 연금액 최고 극대화!", font=get_title_font(34), fill=(161, 98, 7), anchor="lm")

    # Card 3: Neon Mint CTA Button
    y3 = 1650
    draw.rounded_rectangle([75, y3 + 6, 1005, y3 + 146], radius=22, fill=(30, 30, 30))
    draw.rounded_rectangle([70, y3, 1000, y3 + 140], radius=22, fill=(240, 253, 250), outline=(13, 148, 136), width=4)
    draw.rounded_rectangle([95, y3 + 16, 400, y3 + 64], radius=14, fill=(13, 148, 136))
    draw.text((247, y3 + 40), "머니통 3초 연금계산기", font=get_body_font(24, True), fill=(255, 255, 255), anchor="mm")
    draw.text((105, y3 + 98), "내 손익분기점 3초 무료 계산 바로가기!", font=get_title_font(34), fill=(15, 118, 110), anchor="lm")

    out_p = f"{OUT_DIR}/shorts_02_vertical_master.jpg"
    canvas.save(out_p, quality=98)
    canvas.save(f"{BRAIN_DIR}/shorts_02_vertical_master.jpg", quality=98)
    print("Shorts 2 Master v2 ready:", out_p)

def build_shorts_3():
    canvas = Image.new("RGB", (1080, 1920), (240, 253, 250))
    draw = ImageDraw.Draw(canvas)
    
    # 1. Top Graphic Badge
    draw.rounded_rectangle([305, 65, 785, 145], radius=40, fill=(30, 30, 30))
    draw.rounded_rectangle([300, 60, 780, 140], radius=40, fill=(13, 148, 136), outline=(255, 255, 255), width=4)
    draw.text((540, 100), "부부 연금 방어 필살기", font=get_body_font(32, True), fill=(255, 255, 255), anchor="mm")
    
    # 2. Main Title
    draw_3d_text(draw, (540, 205), "부부 기초연금 20% 감액", get_title_font(64), (30, 41, 59), (255, 255, 255), (15, 23, 42), 6, (4, 6))
    draw_3d_text(draw, (540, 280), "40% 깎인다? NO! 월 56만원 사수법", get_title_font(38), (13, 148, 136), (255, 255, 255), (15, 23, 42), 4, (3, 4))
    
    # 3. Center Illustration Frame
    fc3 = Image.open(f"{BRAIN_DIR}/flashcard_03_doodle_1787479512605.jpg").resize((920, 920), Image.Resampling.LANCZOS)
    draw.rounded_rectangle([75, 345, 1005, 1275], radius=28, fill=(30, 30, 30))
    draw.rounded_rectangle([70, 340, 1000, 1270], radius=28, fill=(255, 255, 255), outline=(45, 212, 191), width=5)
    canvas.paste(fc3, (75, 345))
    
    # Washi tapes
    draw.polygon([(60, 330), (170, 305), (180, 345), (70, 370)], fill=(45, 212, 191))
    draw.polygon([(900, 305), (1010, 330), (1000, 370), (890, 345)], fill=(251, 146, 60))

    # 4. Bottom 3 Storytelling Cards
    # Card 1: Mint Teal Pop Card
    y1 = 1310
    draw.rounded_rectangle([75, y1 + 6, 1005, y1 + 146], radius=22, fill=(30, 30, 30))
    draw.rounded_rectangle([70, y1, 1000, y1 + 140], radius=22, fill=(240, 253, 250), outline=(13, 148, 136), width=4)
    draw.rounded_rectangle([95, y1 + 16, 400, y1 + 64], radius=14, fill=(13, 148, 136))
    draw.text((247, y1 + 40), "부부 동시 수령액", font=get_body_font(24, True), fill=(255, 255, 255), anchor="mm")
    draw.text((105, y1 + 98), "월 최대 559,520원 100% 안전 수령!", font=get_title_font(34), fill=(13, 148, 136), anchor="lm")

    # Card 2: Sky Blue Pop Card
    y2 = 1480
    draw.rounded_rectangle([75, y2 + 6, 1005, y2 + 146], radius=22, fill=(30, 30, 30))
    draw.rounded_rectangle([70, y2, 1000, y2 + 140], radius=22, fill=(240, 249, 255), outline=(2, 132, 199), width=4)
    draw.rounded_rectangle([95, y2 + 16, 400, y2 + 64], radius=14, fill=(2, 132, 199))
    draw.text((247, y2 + 40), "국민연금 연계 감액", font=get_body_font(24, True), fill=(255, 255, 255), anchor="mm")
    draw.text((105, y2 + 98), "국민연금 월 60만원 이하 = 감액 0원!", font=get_title_font(34), fill=(3, 105, 161), anchor="lm")

    # Card 3: Amber Gold Pop Card
    y3 = 1650
    draw.rounded_rectangle([75, y3 + 6, 1005, y3 + 146], radius=22, fill=(30, 30, 30))
    draw.rounded_rectangle([70, y3, 1000, y3 + 140], radius=22, fill=(254, 252, 232), outline=(202, 138, 4), width=4)
    draw.rounded_rectangle([95, y3 + 16, 400, y3 + 64], radius=14, fill=(202, 138, 4))
    draw.text((247, y3 + 40), "116만원 소득공제", font=get_body_font(24, True), fill=(255, 255, 255), anchor="mm")
    draw.text((105, y3 + 98), "근로소득 기본공제로 기초연금 전액 사수!", font=get_title_font(34), fill=(161, 98, 7), anchor="lm")

    out_p = f"{OUT_DIR}/shorts_03_vertical_master.jpg"
    canvas.save(out_p, quality=98)
    canvas.save(f"{BRAIN_DIR}/shorts_03_vertical_master.jpg", quality=98)
    print("Shorts 3 Master v2 ready:", out_p)

if __name__ == '__main__':
    build_shorts_2()
    build_shorts_3()
