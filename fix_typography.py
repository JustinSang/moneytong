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

def fix_chapter_1():
    img_path = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch1_comparison_infographic_1787479555594.jpg"
    img = Image.open(img_path).convert("RGBA")
    draw = ImageDraw.Draw(img)
    w, h = img.size # 1376 x 768
    
    # 1. Fix Right Bottom (Arrow text: '대상 인1?수...')
    # Background patch with soft gradient/color
    bg_c1 = (255, 236, 225, 255)
    draw.rectangle([830, 560, 1180, 680], fill=bg_c1)
    
    f_text = get_font(FONT_BOLD, 22, index=1)
    f_title = get_font(FONT_BOLD, 26, index=1)
    f_sub = get_font(FONT_SANS, 20, index=0)
    
    draw.text((850, 575), "만 65세 이상 어르신", font=f_title, fill=(30, 30, 30))
    draw.text((850, 610), "소득 하위 70% 대상", font=f_text, fill=(225, 112, 85))
    draw.text((850, 640), "100% 정부 지원 혜택!", font=f_text, fill=(30, 30, 30))

    # 2. Fix Right Middle Box ('65+ 소년 대상상...')
    draw.rectangle([1060, 260, 1340, 365], fill=(255, 240, 230, 255))
    draw.rounded_rectangle([1060, 260, 1340, 365], radius=16, fill=(255, 255, 255, 240), outline=(255, 120, 80), width=2)
    draw.text((1080, 275), "만 65세 이상 70%", font=f_title, fill=(220, 38, 38))
    draw.text((1080, 310), "100% 정부 세금 지원", font=f_text, fill=(30, 30, 30))
    draw.text((1080, 335), "(단독 34.9만 / 부부 56만)", font=f_sub, fill=(100, 116, 139))

    # 3. Fix Left Bottom ('월월 가입 기여록...')
    draw.rectangle([280, 620, 520, 715], fill=(255, 236, 225, 255))
    draw.text((300, 635), "10년 이상 성실 납부 시", font=f_title, fill=(30, 30, 30))
    draw.text((300, 670), "평생 물가연동 지급!", font=f_text, fill=(2, 132, 199))

    # 4. Fix Left Under Scale ('월전 7여...')
    draw.rectangle([390, 240, 570, 315], fill=(255, 236, 225, 255))
    draw.text((400, 250), "본인 4.5% + 회사 4.5%", font=f_text, fill=(30, 30, 30))
    draw.text((400, 280), "(총 9% 매달 적립)", font=f_sub, fill=(71, 85, 105))

    # 5. Fix Left Table Box
    draw.rectangle([30, 380, 210, 595], fill=(255, 255, 255, 250))
    draw.rounded_rectangle([30, 380, 210, 595], radius=10, fill=(255, 255, 255, 250), outline=(56, 189, 248), width=2)
    draw.text((45, 395), "납부 이력", font=f_title, fill=(2, 132, 199))
    draw.line([(45, 430), (195, 430)], fill=(200, 220, 240), width=1)
    draw.text((45, 445), "• 10년 납부", font=f_text, fill=(50, 50, 50))
    draw.text((45, 480), "• 소득비례", font=f_text, fill=(50, 50, 50))
    draw.text((45, 515), "• 물가연동", font=f_text, fill=(50, 50, 50))
    draw.text((45, 550), "• 평생지급", font=f_text, fill=(220, 38, 38))

    out_fixed = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch1_comparison_fixed.jpg"
    img.convert("RGB").save(out_fixed, quality=98)
    img.convert("RGB").save("/Users/justinsm1max/.gemini/antigravity/brain/42dac325-b75f-4607-8823-1a9e5a734931/ch1_comparison_fixed.jpg", quality=98)
    print("Chapter 1 Fixed successfully:", out_fixed)

def fix_chapter_3():
    img_path = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch3_race_infographic_1787479593579.jpg"
    img = Image.open(img_path).convert("RGBA")
    draw = ImageDraw.Draw(img)
    w, h = img.size # 1376 x 768
    
    # 1. Fix Top Title ('연승연금 티시강')
    bg_title = (255, 248, 240, 255)
    draw.rectangle([400, 60, 960, 165], fill=bg_title)
    
    f_main_title = get_font(FONT_BOLD, 46, index=1)
    f_badge = get_font(FONT_BOLD, 22, index=1)
    
    title_text = "조기연금 vs 연기연금 손익분기점"
    draw.text((430, 85), title_text, font=f_main_title, fill=(30, 30, 30))

    # 2. Fix Left Badge 1 ('미충')
    draw.rectangle([65, 205, 130, 280], fill=(255, 225, 230, 255))
    draw.text((72, 235), "조기\n선택", font=f_badge, fill=(225, 29, 72))

    # 3. Fix Left Badge 2 ('조기신 피정')
    draw.rectangle([70, 480, 145, 555], fill=(215, 245, 240, 255))
    draw.text((78, 500), "만 60세\n개시", font=f_badge, fill=(13, 148, 136))

    out_fixed = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch3_race_fixed.jpg"
    img.convert("RGB").save(out_fixed, quality=98)
    img.convert("RGB").save("/Users/justinsm1max/.gemini/antigravity/brain/42dac325-b75f-4607-8823-1a9e5a734931/ch3_race_fixed.jpg", quality=98)
    print("Chapter 3 Fixed successfully:", out_fixed)

if __name__ == '__main__':
    fix_chapter_1()
    fix_chapter_3()
