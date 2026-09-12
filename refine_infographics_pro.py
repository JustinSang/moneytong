import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONT_SANS = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
FONT_BOLD = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
FONT_SCRIPT = "/System/Library/AssetsV2/com_apple_MobileAsset_Font8/1fb44cf128344a11e654a43ccd7a45a68026bf5d.asset/AssetData/NanumScript.ttc"

def get_font(path, size, index=0):
    try:
        return ImageFont.truetype(path, size, index=index)
    except:
        return ImageFont.load_default()

def refine_chapter_1():
    img_path = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch1_comparison_infographic_1787479555594.jpg"
    img = Image.open(img_path).convert("RGBA")
    draw = ImageDraw.Draw(img)
    w, h = img.size # 1376 x 768
    
    # 1. Right Bottom Callout Card (Clean rounded pill with subtle shadow)
    # Covering x: [820, 1180], y: [550, 680]
    draw.rounded_rectangle([820, 555, 1180, 680], radius=16, fill=(255, 255, 255, 250), outline=(255, 107, 129), width=2)
    f_title = get_font(FONT_BOLD, 24, index=1)
    f_text = get_font(FONT_BOLD, 20, index=1)
    f_sub = get_font(FONT_SANS, 18, index=0)
    
    draw.text((850, 570), "기초연금 수급 대상", font=f_title, fill=(225, 112, 85))
    draw.text((850, 608), "• 만 65세 이상 어르신", font=f_text, fill=(30, 30, 30))
    draw.text((850, 638), "• 소득 하위 70% 100% 정부 지원", font=f_text, fill=(2, 132, 199))

    # 2. Right Middle Box ('정부 지원 대상' badge and details)
    # Covering x: [1050, 1350], y: [260, 420]
    draw.rounded_rectangle([1050, 260, 1355, 420], radius=16, fill=(255, 255, 255, 250), outline=(245, 158, 11), width=2)
    draw.text((1075, 275), "2026 지급 기준액", font=f_title, fill=(217, 119, 6))
    draw.text((1075, 312), "• 단독: 월 최대 34.9만원", font=f_text, fill=(30, 30, 30))
    draw.text((1075, 345), "• 부부: 월 최대 56.0만원", font=f_text, fill=(30, 30, 30))
    draw.text((1075, 380), "(전액 국비·지방비 세금 지급)", font=f_sub, fill=(100, 116, 139))

    # 3. Left Under Scale ('본인 4.5% + 회사 4.5%')
    # Covering x: [380, 640], y: [240, 330]
    draw.rounded_rectangle([380, 240, 640, 330], radius=14, fill=(255, 255, 255, 250), outline=(56, 189, 248), width=2)
    draw.text((400, 252), "국민연금 적립 재원", font=get_font(FONT_BOLD, 22, index=1), fill=(2, 132, 199))
    draw.text((400, 288), "본인 4.5% + 회사 4.5% (총 9%)", font=f_sub, fill=(51, 65, 85))

    # 4. Left Bottom Callout Card ('10년 이상 납부 시 평생 지급')
    # Covering x: [270, 560], y: [620, 720]
    draw.rounded_rectangle([270, 620, 560, 715], radius=16, fill=(255, 255, 255, 250), outline=(56, 189, 248), width=2)
    draw.text((295, 635), "평생 수령 보장 요건", font=f_title, fill=(2, 132, 199))
    draw.text((295, 672), "• 최소 10년 납부 시 물가연동", font=f_text, fill=(30, 30, 30))

    # 5. Left Table Card ('가입 및 기여 내역')
    # Covering x: [20, 225], y: [360, 610]
    draw.rounded_rectangle([20, 360, 225, 610], radius=14, fill=(255, 255, 255, 250), outline=(56, 189, 248), width=2)
    draw.text((35, 375), "가입 및 기여", font=f_title, fill=(2, 132, 199))
    draw.line([(35, 410), (210, 410)], fill=(226, 232, 240), width=1)
    draw.text((35, 425), "• 최소 10년 가입", font=f_text, fill=(51, 65, 85))
    draw.text((35, 465), "• 소득비례 산정", font=f_text, fill=(51, 65, 85))
    draw.text((35, 505), "• 물가 100% 반영", font=f_text, fill=(51, 65, 85))
    draw.text((35, 545), "• 평생 연금 지급", font=f_title, fill=(220, 38, 38))

    out_fixed = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch1_comparison_fixed.jpg"
    img.convert("RGB").save(out_fixed, quality=98)
    img.convert("RGB").save("/Users/justinsm1max/.gemini/antigravity/brain/42dac325-b75f-4607-8823-1a9e5a734931/ch1_comparison_fixed.jpg", quality=98)
    print("Chapter 1 Refined successfully:", out_fixed)

def refine_chapter_3():
    img_path = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch3_race_infographic_1787479593579.jpg"
    img = Image.open(img_path).convert("RGBA")
    draw = ImageDraw.Draw(img)
    w, h = img.size # 1376 x 768
    
    # 1. Top Header Pill Banner (Centered luxury pill banner)
    # Covering x: [360, 1010], y: [60, 175]
    draw.rounded_rectangle([360, 60, 1010, 170], radius=50, fill=(30, 41, 59), outline=(255, 215, 0), width=3)
    f_main_title = get_font(FONT_BOLD, 40, index=1)
    draw.text((395, 92), "🏃 조기연금 vs 연기연금 손익분기점", font=f_main_title, fill=(255, 215, 0))

    # 2. Left Badges (Covering medals cleanly with stylish circular/rounded badges)
    # Medal 1: x: [50, 150], y: [190, 310]
    draw.rounded_rectangle([45, 195, 155, 305], radius=20, fill=(255, 241, 242), outline=(244, 63, 94), width=2)
    f_badge_title = get_font(FONT_BOLD, 22, index=1)
    f_badge_sub = get_font(FONT_SANS, 18, index=0)
    draw.text((62, 225), "조기선택", font=f_badge_title, fill=(225, 29, 72))
    draw.text((65, 260), "최대 -30%", font=f_badge_sub, fill=(159, 18, 57))

    # Medal 2: x: [50, 160], y: [460, 580]
    draw.rounded_rectangle([45, 465, 160, 575], radius=20, fill=(236, 253, 245), outline=(16, 185, 129), width=2)
    draw.text((60, 495), "만 60세~", font=f_badge_title, fill=(5, 150, 105))
    draw.text((58, 530), "신청 가능", font=f_badge_sub, fill=(4, 120, 87))

    out_fixed = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch3_race_fixed.jpg"
    img.convert("RGB").save(out_fixed, quality=98)
    img.convert("RGB").save("/Users/justinsm1max/.gemini/antigravity/brain/42dac325-b75f-4607-8823-1a9e5a734931/ch3_race_fixed.jpg", quality=98)
    print("Chapter 3 Refined successfully:", out_fixed)

if __name__ == '__main__':
    refine_chapter_1()
    refine_chapter_3()
