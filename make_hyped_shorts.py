import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONT_PEN = "/System/Library/AssetsV2/com_apple_MobileAsset_Font8/1fb44cf128344a11e654a43ccd7a45a68026bf5d.asset/AssetData/NanumScript.ttc"
FONT_EXTRA_BOLD = "/System/Library/AssetsV2/com_apple_MobileAsset_Font8/7a0b5c0f3c1d41c4c52a33343496c9c65ad52c50.asset/AssetData/NanumGothic.ttc"
FONT_SANS = "/System/Library/Fonts/AppleSDGothicNeo.ttc"

def get_pen_font(size):
    try:
        return ImageFont.truetype(FONT_PEN, size, index=1)
    except:
        return ImageFont.truetype(FONT_SANS, size, index=1)

def get_bold_font(size):
    try:
        return ImageFont.truetype(FONT_EXTRA_BOLD, size, index=0)
    except:
        return ImageFont.truetype(FONT_SANS, size, index=1)

def draw_text_with_outline(draw, pos, text, font, fill_color, outline_color, outline_width=3, anchor="mm"):
    x, y = pos
    # Draw outline
    for dx in range(-outline_width, outline_width + 1):
        for dy in range(-outline_width, outline_width + 1):
            if dx != 0 or dy != 0:
                draw.text((x + dx, y + dy), text, font=font, fill=outline_color, anchor=anchor)
    # Draw text
    draw.text((x, y), text, font=font, fill=fill_color, anchor=anchor)

OUT_DIR = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics"
BRAIN_DIR = "/Users/justinsm1max/.gemini/antigravity/brain/42dac325-b75f-4607-8823-1a9e5a734931"

def build_shorts_2_hyped():
    # Warm pastel cream comic paper background
    canvas = Image.new("RGB", (1080, 1920), (255, 248, 238))
    draw = ImageDraw.Draw(canvas)
    
    # 1. Top Graphic Badge (Pop-art Flame Banner)
    # Red-orange pill with bold drop shadow and sticker stroke
    draw.rounded_rectangle([300, 60, 780, 140], radius=40, fill=(20, 20, 20)) # shadow
    draw.rounded_rectangle([295, 55, 775, 135], radius=40, fill=(255, 71, 87), outline=(255, 255, 255), width=4)
    draw_text_with_outline(draw, (535, 95), "🔥 5060 은퇴 필수 체크", get_bold_font(32), (255, 255, 255), (180, 20, 40), 2)
    
    # 2. Main Title (Huge 3D Pop typography)
    draw_text_with_outline(draw, (540, 205), "조기연금 VS 연기연금", get_bold_font(62), (30, 41, 59), (255, 255, 255), 5)
    draw_text_with_outline(draw, (540, 280), "언제 받아야 내 돈을 최대로 지킬까?", get_bold_font(38), (225, 29, 72), (255, 255, 255), 3)
    
    # 3. Center Illustration Frame (Comic Polaroid with Washi Tape)
    fc2 = Image.open(f"{BRAIN_DIR}/flashcard_02_doodle_1787479475893.jpg").resize((920, 920), Image.Resampling.LANCZOS)
    
    # Frame background & shadow
    draw.rounded_rectangle([75, 345, 1005, 1275], radius=28, fill=(30, 30, 30, 40)) # shadow
    draw.rounded_rectangle([70, 340, 1000, 1270], radius=28, fill=(255, 255, 255), outline=(255, 180, 50), width=5)
    canvas.paste(fc2, (75, 345))
    
    # Washi tape decorations at corners
    draw.polygon([(60, 330), (160, 310), (170, 350), (70, 370)], fill=(255, 107, 129)) # top left tape
    draw.polygon([(910, 310), (1010, 330), (1000, 370), (900, 350)], fill=(56, 189, 248)) # top right tape

    # 4. Bottom 3 Pop-Art Infographic Takeaway Badges
    # Card 1: Coral Red Pop Tape
    y1 = 1310
    draw.rounded_rectangle([75, y1 + 5, 1005, y1 + 145], radius=22, fill=(30, 30, 30)) # shadow
    draw.rounded_rectangle([70, y1, 1000, y1 + 140], radius=22, fill=(255, 241, 242), outline=(244, 63, 94), width=4)
    # Left pill tag
    draw.rounded_rectangle([95, y1 + 20, 410, y1 + 75], radius=15, fill=(244, 63, 94))
    draw.text((252, y1 + 47), "🐰 78세 이전 사망 시", font=get_bold_font(26), fill=(255, 255, 255), anchor="mm")
    draw.text((100, y1 + 105), "👉 조기연금(-30%) 총 수령액 압도적 이득!", font=get_bold_font(30), fill=(225, 29, 72))

    # Card 2: Golden Yellow Pop Tape
    y2 = 1480
    draw.rounded_rectangle([75, y2 + 5, 1005, y2 + 145], radius=22, fill=(30, 30, 30)) # shadow
    draw.rounded_rectangle([70, y2, 1000, y2 + 140], radius=22, fill=(254, 252, 232), outline=(234, 179, 8), width=4)
    draw.rounded_rectangle([95, y2 + 20, 410, y2 + 75], radius=15, fill=(202, 138, 4))
    draw.text((252, y2 + 47), "🐢 84세 이상 장수 시", font=get_bold_font(26), fill=(255, 255, 255), anchor="mm")
    draw.text((100, y2 + 105), "👉 연기연금(+36%) 매월 연금액 최고 극대화!", font=get_bold_font(30), fill=(161, 98, 7))

    # Card 3: Neon Mint CTA Button
    y3 = 1650
    draw.rounded_rectangle([75, y3 + 5, 1005, y3 + 145], radius=22, fill=(30, 30, 30)) # shadow
    draw.rounded_rectangle([70, y3, 1000, y3 + 140], radius=22, fill=(240, 253, 250), outline=(13, 148, 136), width=4)
    draw.rounded_rectangle([95, y3 + 20, 410, y3 + 75], radius=15, fill=(13, 148, 136))
    draw.text((252, y3 + 47), "✨ 머니통 연금계산기", font=get_bold_font(26), fill=(255, 255, 255), anchor="mm")
    draw.text((100, y3 + 105), "👉 내 손익분기점 3초 무료 계산 바로가기!", font=get_bold_font(30), fill=(15, 118, 110))

    out_p = f"{OUT_DIR}/shorts_02_vertical_master.jpg"
    canvas.save(out_p, quality=98)
    canvas.save(f"{BRAIN_DIR}/shorts_02_vertical_master.jpg", quality=98)
    print("Shorts 2 Hyped Master ready:", out_p)

def build_shorts_3_hyped():
    canvas = Image.new("RGB", (1080, 1920), (240, 253, 250))
    draw = ImageDraw.Draw(canvas)
    
    # 1. Top Graphic Badge
    draw.rounded_rectangle([300, 60, 780, 140], radius=40, fill=(20, 20, 20)) # shadow
    draw.rounded_rectangle([295, 55, 775, 135], radius=40, fill=(13, 148, 136), outline=(255, 255, 255), width=4)
    draw_text_with_outline(draw, (535, 95), "🛡️ 부부 연금 방어 필살기", get_bold_font(32), (255, 255, 255), (10, 90, 80), 2)
    
    # 2. Main Title
    draw_text_with_outline(draw, (540, 205), "부부 기초연금 20% 감액", get_bold_font(62), (30, 41, 59), (255, 255, 255), 5)
    draw_text_with_outline(draw, (540, 280), "40% 깎인다? NO! 월 56만원 사수법", get_bold_font(38), (13, 148, 136), (255, 255, 255), 3)
    
    # 3. Center Illustration Frame
    fc3 = Image.open(f"{BRAIN_DIR}/flashcard_03_doodle_1787479512605.jpg").resize((920, 920), Image.Resampling.LANCZOS)
    draw.rounded_rectangle([75, 345, 1005, 1275], radius=28, fill=(30, 30, 30, 40)) # shadow
    draw.rounded_rectangle([70, 340, 1000, 1270], radius=28, fill=(255, 255, 255), outline=(45, 212, 191), width=5)
    canvas.paste(fc3, (75, 345))
    
    # Washi tapes
    draw.polygon([(60, 330), (160, 310), (170, 350), (70, 370)], fill=(45, 212, 191))
    draw.polygon([(910, 310), (1010, 330), (1000, 370), (900, 350)], fill=(251, 146, 60))

    # 4. Bottom 3 Pop-Art Infographic Takeaway Badges
    # Card 1: Mint Teal Pop Tape
    y1 = 1310
    draw.rounded_rectangle([75, y1 + 5, 1005, y1 + 145], radius=22, fill=(30, 30, 30)) # shadow
    draw.rounded_rectangle([70, y1, 1000, y1 + 140], radius=22, fill=(240, 253, 250), outline=(13, 148, 136), width=4)
    draw.rounded_rectangle([95, y1 + 20, 430, y1 + 75], radius=15, fill=(13, 148, 136))
    draw.text((262, y1 + 47), "💰 부부 동시 수령액", font=get_bold_font(26), fill=(255, 255, 255), anchor="mm")
    draw.text((100, y1 + 105), "👉 월 최대 559,520원 100% 안전 수령!", font=get_bold_font(30), fill=(13, 148, 136))

    # Card 2: Sky Blue Pop Tape
    y2 = 1480
    draw.rounded_rectangle([75, y2 + 5, 1005, y2 + 145], radius=22, fill=(30, 30, 30)) # shadow
    draw.rounded_rectangle([70, y2, 1000, y2 + 140], radius=22, fill=(240, 249, 255), outline=(2, 132, 199), width=4)
    draw.rounded_rectangle([95, y2 + 20, 430, y2 + 75], radius=15, fill=(2, 132, 199))
    draw.text((262, y2 + 47), "🛡️ 국민연금 연계감액", font=get_bold_font(26), fill=(255, 255, 255), anchor="mm")
    draw.text((100, y2 + 105), "👉 국민연금 월 60만원 이하 = 감액 0원!", font=get_bold_font(30), fill=(3, 105, 161))

    # Card 3: Amber Gold Pop Tape
    y3 = 1650
    draw.rounded_rectangle([75, y3 + 5, 1005, y3 + 145], radius=22, fill=(30, 30, 30)) # shadow
    draw.rounded_rectangle([70, y3, 1000, y3 + 140], radius=22, fill=(254, 252, 232), outline=(202, 138, 4), width=4)
    draw.rounded_rectangle([95, y3 + 20, 430, y3 + 75], radius=15, fill=(202, 138, 4))
    draw.text((262, y3 + 47), "✨ 116만원 소득공제", font=get_bold_font(26), fill=(255, 255, 255), anchor="mm")
    draw.text((100, y3 + 105), "👉 근로소득 기본공제로 기초연금 전액 사수!", font=get_bold_font(30), fill=(161, 98, 7))

    out_p = f"{OUT_DIR}/shorts_03_vertical_master.jpg"
    canvas.save(out_p, quality=98)
    canvas.save(f"{BRAIN_DIR}/shorts_03_vertical_master.jpg", quality=98)
    print("Shorts 3 Hyped Master ready:", out_p)

if __name__ == '__main__':
    build_shorts_2_hyped()
    build_shorts_3_hyped()
