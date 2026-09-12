import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Output directory
OUT_DIR = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/trendy"
os.makedirs(OUT_DIR, exist_ok=True)

# Font paths
FONT_SANS = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
FONT_SCRIPT = "/System/Library/AssetsV2/com_apple_MobileAsset_Font8/1fb44cf128344a11e654a43ccd7a45a68026bf5d.asset/AssetData/NanumScript.ttc"
FONT_CHALK = "/System/Library/Fonts/Supplemental/ChalkboardSE.ttc"

def get_font(path, size, index=0):
    try:
        return ImageFont.truetype(path, size, index=index)
    except:
        try:
            return ImageFont.truetype(FONT_SANS, size, index=0)
        except:
            return ImageFont.load_default()

def draw_grid_paper(draw, width, height, grid_size=30, line_color=(230, 235, 240)):
    for x in range(0, width, grid_size):
        draw.line([(x, 0), (x, height)], fill=line_color, width=1)
    for y in range(0, height, grid_size):
        draw.line([(0, y), (width, y)], fill=line_color, width=1)

def draw_tape(img, x, y, width=140, height=40, angle=-5):
    tape = Image.new('RGBA', (width, height), (255, 255, 255, 160))
    t_draw = ImageDraw.Draw(tape)
    t_draw.rectangle([0, 0, width, height], fill=(240, 235, 210, 180), outline=(220, 215, 190, 200), width=1)
    # Add zig-zag edges
    tape_rot = tape.rotate(angle, expand=True, resample=Image.BICUBIC)
    img.paste(tape_rot, (x, y), tape_rot)

def draw_sticky_note(img, x, y, w, h, bg_color, shadow_color=(0, 0, 0, 35), angle=0):
    # Create shadow
    pad = 30
    shadow = Image.new('RGBA', (w + pad*2, h + pad*2), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([pad, pad+10, pad+w, pad+h+10], radius=8, fill=shadow_color)
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))
    
    # Create note
    note = Image.new('RGBA', (w, h), bg_color)
    n_draw = ImageDraw.Draw(note)
    n_draw.rounded_rectangle([0, 0, w-1, h-1], radius=8, outline=(0, 0, 0, 20), width=1)
    
    # Paste note on shadow
    shadow.paste(note, (pad, pad), note)
    
    # Rotate if needed
    if angle != 0:
        shadow = shadow.rotate(angle, expand=True, resample=Image.BICUBIC)
        
    img.paste(shadow, (x - pad, y - pad), shadow)

# ========================================================
# 1. 멀티채널 바이럴 플래시카드 4컷 (1080x1080)
# ========================================================

def create_flashcard_1():
    # Style A: 화이트보드 + 네온 옐로우 포스트잇 (Q1: 일하면 국민연금 깎일까?)
    img = Image.new('RGB', (1080, 1080), (245, 247, 250)) # 화이트보드 톤
    draw = ImageDraw.Draw(img)
    draw_grid_paper(draw, 1080, 1080, 40, (235, 238, 242))
    
    # 상단 뱃지
    font_badge = get_font(FONT_SANS, 32)
    font_title = get_font(FONT_SANS, 56)
    font_hand = get_font(FONT_SCRIPT, 76, index=1)
    font_bold = get_font(FONT_SANS, 48)
    font_num = get_font(FONT_CHALK, 90)

    draw.rounded_rectangle([80, 70, 420, 130], radius=30, fill=(30, 41, 59))
    draw.text((115, 82), "📌 머니통 5060 팩트체크", font=font_badge, fill=(255, 215, 0))

    # 포스트잇 카드 (옐로우)
    draw_sticky_note(img, 80, 180, 920, 780, (255, 243, 140, 255), angle=-1)
    draw_tape(img, 470, 155, 150, 45, angle=2)

    # 포스트잇 내부 텍스트 드로잉
    p_img = Image.open(f"{OUT_DIR}/temp_overlay.png") if os.path.exists(f"{OUT_DIR}/temp_overlay.png") else img
    p_draw = ImageDraw.Draw(img)

    # Q 텍스트
    p_draw.text((140, 240), "Q. 국민연금 받으면서 일하면", font=font_title, fill=(30, 30, 30))
    p_draw.text((140, 320), "    무조건 연금이 깎인다?", font=font_title, fill=(30, 30, 30))

    # 구분선 (형광펜 마커 느낌)
    p_draw.line([(140, 430), (940, 430)], fill=(255, 107, 129, 180), width=6)

    # A 텍스트 (대형 손글씨 + 숫자)
    p_draw.text((140, 470), "정답은 ❌ 절대 아닙니다!", font=font_hand, fill=(220, 38, 38))
    
    # 박스 설명
    p_draw.rounded_rectangle([130, 570, 950, 840], radius=16, fill=(255, 255, 255, 220), outline=(230, 210, 100), width=2)
    p_draw.text((160, 600), "2026년 기준 'A값' 기준선", font=font_bold, fill=(71, 85, 105))
    p_draw.text((160, 670), "월 308만원 이하 ➔ 1원도 안 깎임!", font=font_bold, fill=(15, 23, 42))
    p_draw.text((160, 750), "(근로소득공제 116만원까지 추가 적용)", font=get_font(FONT_SANS, 34), fill=(100, 116, 139))

    # 하단 출처
    p_draw.text((140, 880), "👉 머니통 5060 라디오 제1화 | 보건복지부 고시 기준", font=get_font(FONT_SANS, 30), fill=(120, 120, 120))

    img.save(f"{OUT_DIR}/flashcard_01_sticky_yellow.jpg", quality=95)
    print("Flashcard 1 generated.")

def create_flashcard_2():
    # Style B: 미색 모눈종이 + 핑크 코랄 포스트잇 (Q2: 조기연금 vs 연기연금 손익분기점)
    img = Image.new('RGB', (1080, 1080), (250, 248, 242)) # 미색 페이퍼
    draw = ImageDraw.Draw(img)
    draw_grid_paper(draw, 1080, 1080, 35, (238, 232, 222))

    font_badge = get_font(FONT_SANS, 32)
    font_title = get_font(FONT_SANS, 56)
    font_hand = get_font(FONT_SCRIPT, 74, index=1)
    font_bold = get_font(FONT_SANS, 44)

    draw.rounded_rectangle([80, 70, 430, 130], radius=30, fill=(180, 83, 9))
    draw.text((115, 82), "💡 5060 연금 손익 꿀팁", font=font_badge, fill=(255, 255, 255))

    # 포스트잇 카드 (소프트 코랄/핑크)
    draw_sticky_note(img, 80, 180, 920, 780, (255, 225, 230, 255), angle=1.5)
    draw_tape(img, 460, 155, 160, 45, angle=-3)

    p_draw = ImageDraw.Draw(img)
    p_draw.text((140, 240), "Q. 조기연금 신청하면", font=font_title, fill=(30, 30, 30))
    p_draw.text((140, 320), "    무조건 평생 손해일까?", font=font_title, fill=(30, 30, 30))

    p_draw.line([(140, 430), (940, 430)], fill=(255, 159, 67, 200), width=6)

    p_draw.text((140, 470), "정답은 ❌ 78세 이전엔 이득!", font=font_hand, fill=(225, 112, 85))

    # 손익분기표 박스
    p_draw.rounded_rectangle([130, 570, 950, 840], radius=16, fill=(255, 255, 255, 230), outline=(240, 200, 205), width=2)
    p_draw.text((160, 600), "📊 통계적 손익분기점 나이", font=font_bold, fill=(71, 85, 105))
    p_draw.text((160, 670), "• 78세 이전 사망 시 ➔ 조기연금 총수령액 WIN", font=font_bold, fill=(194, 65, 12))
    p_draw.text((160, 750), "• 84세 이상 장수 시 ➔ 연기연금(+36%) 압도적 WIN", font=font_bold, fill=(3, 105, 161))

    p_draw.text((140, 880), "👉 머니통 5060 라디오 제1화 | 7.2% 가산 vs 6% 감액 공식", font=get_font(FONT_SANS, 30), fill=(120, 120, 120))

    img.save(f"{OUT_DIR}/flashcard_02_sticky_pink.jpg", quality=95)
    print("Flashcard 2 generated.")

def create_flashcard_3():
    # Style C: 화이트보드 + 민트 그린 포스트잇 (Q3: 부부 기초연금 20% 감액)
    img = Image.new('RGB', (1080, 1080), (245, 247, 250))
    draw = ImageDraw.Draw(img)
    draw_grid_paper(draw, 1080, 1080, 40, (235, 238, 242))

    font_badge = get_font(FONT_SANS, 32)
    font_title = get_font(FONT_SANS, 54)
    font_hand = get_font(FONT_SCRIPT, 74, index=1)
    font_bold = get_font(FONT_SANS, 44)

    draw.rounded_rectangle([80, 70, 430, 130], radius=30, fill=(15, 118, 110))
    draw.text((115, 82), "🛡️ 기초연금 감액 방어", font=font_badge, fill=(255, 255, 255))

    draw_sticky_note(img, 80, 180, 920, 780, (215, 250, 235, 255), angle=-1.2)
    draw_tape(img, 470, 155, 150, 45, angle=1)

    p_draw = ImageDraw.Draw(img)
    p_draw.text((140, 240), "Q. 부부 둘 다 기초연금 받으면", font=font_title, fill=(30, 30, 30))
    p_draw.text((140, 320), "    40%나 깎여서 손해다?", font=font_title, fill=(30, 30, 30))

    p_draw.line([(140, 430), (940, 430)], fill=(16, 185, 129, 200), width=6)

    p_draw.text((140, 470), "정답은 ❌ 20%만 감액됩니다!", font=font_hand, fill=(13, 148, 136))

    p_draw.rounded_rectangle([130, 570, 950, 840], radius=16, fill=(255, 255, 255, 230), outline=(180, 235, 215), width=2)
    p_draw.text((160, 600), "💰 2026년 부부 기초연금 수령액", font=font_bold, fill=(71, 85, 105))
    p_draw.text((160, 670), "• 단독 1인: 월 최대 34.9만원 (선정 247만원)", font=font_bold, fill=(15, 23, 42))
    p_draw.text((160, 750), "• 부부 합산: 월 55만 9,520원 (선정 395.2만원)", font=font_bold, fill=(13, 148, 136))

    p_draw.text((140, 880), "👉 머니통 5060 라디오 제1화 | 부부 감액 방어 비법", font=get_font(FONT_SANS, 30), fill=(120, 120, 120))

    img.save(f"{OUT_DIR}/flashcard_03_sticky_mint.jpg", quality=95)
    print("Flashcard 3 generated.")

def create_flashcard_4():
    # Card 4: 머니통 연금계산기 안내 및 요약 카드
    img = Image.new('RGB', (1080, 1080), (15, 23, 42)) # 럭셔리 다크 슬레이트
    draw = ImageDraw.Draw(img)

    font_badge = get_font(FONT_SANS, 34)
    font_main = get_font(FONT_SANS, 64)
    font_sub = get_font(FONT_SANS, 40)
    font_btn = get_font(FONT_SANS, 48)

    # 엠블럼
    draw.rounded_rectangle([80, 80, 480, 150], radius=35, fill=(30, 41, 59))
    draw.text((115, 95), "📻 머니통 5060 돈 되는 라디오", font=font_badge, fill=(255, 215, 0))

    draw.text((80, 240), "내 예상 연금 & 감액 여부", font=font_main, fill=(255, 255, 255))
    draw.text((80, 330), "3초 만에 무료로 계산해보세요!", font=font_main, fill=(255, 215, 0))

    # 요약 카드 3종 미니 리스트
    draw.rounded_rectangle([80, 440, 1000, 800], radius=24, fill=(30, 41, 59), outline=(51, 65, 85), width=2)
    draw.text((120, 480), "✅ 2026 국민연금 감액 차단선 (A값 308만원)", font=font_sub, fill=(241, 245, 249))
    draw.text((120, 580), "✅ 조기노령 vs 연기연금 나이별 손익분기점", font=font_sub, fill=(241, 245, 249))
    draw.text((120, 680), "✅ 기초연금 단독 34.9만 / 부부 56만원 요건", font=font_sub, fill=(241, 245, 249))

    # CTA 버튼
    draw.rounded_rectangle([80, 860, 1000, 980], radius=60, fill=(255, 215, 0))
    draw.text((250, 895), "👉 moneytong.com/blog/basic-pension", font=font_btn, fill=(15, 23, 42))

    img.save(f"{OUT_DIR}/flashcard_04_summary_cta.jpg", quality=95)
    print("Flashcard 4 generated.")

# ========================================================
# 2. 20분 롱폼 5대 챕터별 시각 인포그래픽 프레임 (1920x1080)
# ========================================================

def create_longform_chapters():
    os.makedirs(f"{OUT_DIR}/chapters", exist_ok=True)
    
    font_chap = get_font(FONT_SANS, 36)
    font_h1 = get_font(FONT_SANS, 64)
    font_card_title = get_font(FONT_SANS, 48)
    font_body = get_font(FONT_SANS, 36)
    font_bold = get_font(FONT_SANS, 44)

    # Chapter 1: 기초연금 vs 국민연금 한눈에 비교 (양자 비교표)
    c1 = Image.new('RGB', (1920, 1080), (10, 15, 30))
    d1 = ImageDraw.Draw(c1)
    # Header
    d1.rounded_rectangle([100, 50, 480, 110], radius=30, fill=(30, 41, 59))
    d1.text((130, 65), "CHAPTER 1 (00:00 ~ 03:45)", font=font_chap, fill=(255, 215, 0))
    d1.text((100, 140), "기초연금 vs 국민연금 한눈에 완벽 비교", font=font_h1, fill=(255, 255, 255))
    
    # 2-Column Split Cards
    # Left Card: 국민연금
    d1.rounded_rectangle([100, 240, 930, 820], radius=24, fill=(18, 30, 49), outline=(56, 189, 248), width=2)
    d1.text((150, 280), "🏛️ 국민연금 (내가 낸 돈 기반)", font=font_card_title, fill=(56, 189, 248))
    d1.text((150, 380), "• 재원: 본인 4.5% + 회사 4.5% (총 9%)", font=font_body, fill=(226, 232, 240))
    d1.text((150, 460), "• 지급 기준: 최소 10년 이상 가입 납부", font=font_body, fill=(226, 232, 240))
    d1.text((150, 540), "• 수령액: 가입기간 및 납부보험료 비례", font=font_body, fill=(226, 232, 240))
    d1.text((150, 620), "• 특징: 물가상승률 100% 반영 평생 지급", font=font_bold, fill=(255, 215, 0))
    d1.text((150, 710), "⚠️ 일할 경우 소득 A값(308만원) 초과 시 감액", font=font_body, fill=(248, 113, 113))

    # Right Card: 기초연금
    d1.rounded_rectangle([990, 240, 1820, 820], radius=24, fill=(35, 30, 20), outline=(250, 204, 21), width=2)
    d1.text((1040, 280), "🎁 기초연금 (100% 국가 세금 지원)", font=font_card_title, fill=(250, 204, 21))
    d1.text((1040, 380), "• 재원: 전액 국가 및 지자체 세금", font=font_body, fill=(226, 232, 240))
    d1.text((1040, 460), "• 대상: 만 65세 이상 소득인정액 하위 70%", font=font_body, fill=(226, 232, 240))
    d1.text((1040, 540), "• 2026 수령액: 단독 34.9만원 / 부부 56만원", font=font_bold, fill=(250, 204, 21))
    d1.text((1040, 620), "• 2026 선정기준액: 단독 247만 / 부부 395.2만", font=font_body, fill=(226, 232, 240))
    d1.text((1040, 710), "⚠️ 부부 동시 수령 시 20% 감액 룰 적용", font=font_body, fill=(248, 113, 113))
    
    # Bottom Note
    d1.text((100, 880), "💡 두 연금은 중복 수령 가능하지만, 국민연금이 60만원을 넘으면 연계감액이 발생할 수 있습니다.", font=font_chap, fill=(148, 163, 184))
    c1.save(f"{OUT_DIR}/chapters/ch1_comparison.jpg", quality=95)

    # Chapter 2: 국민연금 감액 없이 일하는 법 (A값 308만원 5구간 계단식 다이어그램)
    c2 = Image.new('RGB', (1920, 1080), (15, 20, 35))
    d2 = ImageDraw.Draw(c2)
    d2.rounded_rectangle([100, 50, 480, 110], radius=30, fill=(30, 41, 59))
    d2.text((130, 65), "CHAPTER 2 (03:45 ~ 08:20)", font=font_chap, fill=(255, 215, 0))
    d2.text((100, 140), "2026 국민연금 감액 없이 일하는 법 (A값 308만원 공식)", font=font_h1, fill=(255, 255, 255))

    # A-Value Highlight Box
    d2.rounded_rectangle([100, 240, 1820, 400], radius=20, fill=(30, 58, 138), outline=(96, 165, 250), width=2)
    d2.text((140, 270), "🎯 2026년 국민연금 감액 기준선 (A값) = 월 3,088,542원", font=font_card_title, fill=(255, 255, 255))
    d2.text((140, 335), "월 소득(근로+사업)에서 '근로소득공제 116만원'을 뺀 금액이 308만원 이하라면 ➔ 감액 0원 (전액 지급)", font=font_body, fill=(191, 219, 254))

    # 5-Step Deduction Table
    steps = [
        ("1구간", "초과액 100만원 미만", "초과액의 5% 감액", "최대 5만원 감액"),
        ("2구간", "초과액 100만 ~ 200만원", "5만원 + 100만 초과분의 10%", "최대 15만원 감액"),
        ("3구간", "초과액 200만 ~ 300만원", "15만원 + 200만 초과분의 15%", "최대 30만원 감액"),
        ("4구간", "초과액 300만 ~ 400만원", "30만원 + 300만 초과분의 20%", "최대 50만원 감액"),
        ("5구간", "초과액 400만원 이상", "50만원 + 400만 초과분의 25%", "최대 연금의 50% 한도")
    ]
    y_start = 440
    for i, (seg, cond, rate, max_cut) in enumerate(steps):
        bg_c = (24, 33, 47) if i % 2 == 0 else (18, 24, 38)
        d2.rounded_rectangle([100, y_start + i*75, 1820, y_start + (i+1)*75 - 10], radius=10, fill=bg_c)
        d2.text((140, y_start + i*75 + 15), f"• {seg}: {cond}", font=font_body, fill=(241, 245, 249))
        d2.text((900, y_start + i*75 + 15), f"➔ {rate}", font=font_body, fill=(250, 204, 21))
        d2.text((1500, y_start + i*75 + 15), f"[{max_cut}]", font=font_body, fill=(148, 163, 184))

    d2.text((100, 880), "💡 핵심 결론: 연금이 일부 깎이더라도 일해서 버는 총소득이 훨씬 크므로 계속 일하는 것이 무조건 이득입니다!", font=font_chap, fill=(74, 222, 128))
    c2.save(f"{OUT_DIR}/chapters/ch2_deduction_steps.jpg", quality=95)

    # Chapter 3: 조기연금 vs 연기연금 손익분기점 (78세 vs 84세)
    c3 = Image.new('RGB', (1920, 1080), (18, 16, 26))
    d3 = ImageDraw.Draw(c3)
    d3.rounded_rectangle([100, 50, 480, 110], radius=30, fill=(59, 30, 50))
    d3.text((130, 65), "CHAPTER 3 (08:20 ~ 13:10)", font=font_chap, fill=(255, 215, 0))
    d3.text((100, 140), "조기노령연금 vs 연기연금 충격의 손익분기점", font=font_h1, fill=(255, 255, 255))

    # 3 Cards: 조기 vs 정상 vs 연기
    d3.rounded_rectangle([100, 240, 640, 780], radius=20, fill=(45, 20, 30), outline=(244, 63, 94), width=2)
    d3.text((130, 270), "🏃 조기노령연금 (-30%)", font=font_card_title, fill=(244, 63, 94))
    d3.text((130, 360), "• 최대 5년 일찍 수령", font=font_body, fill=(226, 232, 240))
    d3.text((130, 430), "• 1년당 6% 평생 감액", font=font_body, fill=(226, 232, 240))
    d3.text((130, 500), "• 5년 조기: 70%만 수령", font=font_body, fill=(226, 232, 240))
    d3.text((130, 600), "🎯 손익분기점: 76~78세", font=font_bold, fill=(255, 215, 0))
    d3.text((130, 670), "➔ 78세 이전엔 총수령액 유리", font=font_body, fill=(251, 191, 36))

    d3.rounded_rectangle([680, 240, 1220, 780], radius=20, fill=(25, 30, 45), outline=(148, 163, 184), width=2)
    d3.text((710, 270), "⚖️ 정상 수령 (만 65세)", font=font_card_title, fill=(148, 163, 184))
    d3.text((710, 360), "• 만 65세 정상 개시", font=font_body, fill=(226, 232, 240))
    d3.text((710, 430), "• 감액/가산 없이 100%", font=font_body, fill=(226, 232, 240))
    d3.text((710, 500), "• 기본 연금액 전액 지급", font=font_body, fill=(226, 232, 240))
    d3.text((710, 600), "🎯 평균 수명 기준 표준", font=font_bold, fill=(255, 255, 255))
    d3.text((710, 670), "➔ 대한민국 평균 83세 기준", font=font_body, fill=(203, 213, 225))

    d3.rounded_rectangle([1260, 240, 1820, 780], radius=20, fill=(20, 40, 35), outline=(34, 197, 94), width=2)
    d3.text((1290, 270), "⏳ 연기연금 (+36%)", font=font_card_title, fill=(34, 197, 94))
    d3.text((1290, 360), "• 최대 5년 늦게 수령", font=font_body, fill=(226, 232, 240))
    d3.text((1290, 430), "• 1년당 7.2% 평생 가산", font=font_body, fill=(226, 232, 240))
    d3.text((1290, 500), "• 5년 연기: 136% 수령", font=font_body, fill=(226, 232, 240))
    d3.text((1290, 600), "🎯 손익분기점: 82~84세", font=font_bold, fill=(255, 215, 0))
    d3.text((1290, 670), "➔ 84세 이상 장수 시 압도적", font=font_body, fill=(74, 222, 128))

    d3.text((100, 880), "💡 선택 기준: 건강 상태와 자금 여력에 따라 78세를 기준으로 전략적 선택이 필수적입니다!", font=font_chap, fill=(255, 215, 0))
    c3.save(f"{OUT_DIR}/chapters/ch3_breakeven_chart.jpg", quality=95)

    # Chapter 4: 기초연금 단독 247만 / 부부 395.2만 수령 자격
    c4 = Image.new('RGB', (1920, 1080), (12, 25, 30))
    d4 = ImageDraw.Draw(c4)
    d4.rounded_rectangle([100, 50, 480, 110], radius=30, fill=(20, 80, 70))
    d4.text((130, 65), "CHAPTER 4 (13:10 ~ 17:30)", font=font_chap, fill=(255, 215, 0))
    d4.text((100, 140), "2026 기초연금 100% 수령 요건 및 선정기준액", font=font_h1, fill=(255, 255, 255))

    d4.rounded_rectangle([100, 240, 930, 800], radius=20, fill=(18, 40, 45), outline=(45, 212, 191), width=2)
    d4.text((140, 280), "👤 단독 가구 기준 (만 65세 이상)", font=font_card_title, fill=(45, 212, 191))
    d4.text((140, 380), "• 2026 선정기준액: 월 247만 원 이하", font=font_bold, fill=(255, 255, 255))
    d4.text((140, 460), "• 월 최대 수령액: 34만 9,700원 (2.1% 인상)", font=font_bold, fill=(250, 204, 21))
    d4.text((140, 550), "• 소득인정액 산정 공식:", font=font_body, fill=(204, 251, 241))
    d4.text((140, 620), "  (근로소득-116만원)x70% + 재산환산액", font=font_body, fill=(153, 246, 228))
    d4.text((140, 700), "• 일반재산 공제: 대도시 1.35억원 기본 공제", font=font_body, fill=(204, 251, 241))

    d4.rounded_rectangle([990, 240, 1820, 800], radius=20, fill=(25, 45, 40), outline=(52, 211, 153), width=2)
    d4.text((1030, 280), "👥 부부 가구 기준 (둘 다 만 65세 이상)", font=font_card_title, fill=(52, 211, 153))
    d4.text((1030, 380), "• 2026 선정기준액: 월 395만 2,000원 이하", font=font_bold, fill=(255, 255, 255))
    d4.text((1030, 460), "• 부부 합산 수령액: 월 55만 9,520원", font=font_bold, fill=(250, 204, 21))
    d4.text((1030, 550), "• 부부 감액: 각 20%씩 감액 (279,760원 x 2)", font=font_body, fill=(209, 250, 229))
    d4.text((1030, 620), "• 금융재산: 2천만원 기본공제 후 월 4% 환산", font=font_body, fill=(167, 243, 208))
    d4.text((1030, 700), "• 자동차: 3,000cc 이상 or 4천만원 이상 주의", font=font_body, fill=(248, 113, 113))

    d4.text((100, 880), "💡 소득인정액은 '복지로(bokjiro.go.kr)' 모의계산기에서 3분 만에 정확히 확인 가능합니다.", font=font_chap, fill=(148, 163, 184))
    c4.save(f"{OUT_DIR}/chapters/ch4_basic_pension_criteria.jpg", quality=95)

    # Chapter 5: 부부 20% 감액 방어 및 연계 감액 꿀팁
    c5 = Image.new('RGB', (1920, 1080), (25, 20, 15))
    d5 = ImageDraw.Draw(c5)
    d5.rounded_rectangle([100, 50, 480, 110], radius=30, fill=(80, 50, 20))
    d5.text((130, 65), "CHAPTER 5 (17:30 ~ 20:10)", font=font_chap, fill=(255, 215, 0))
    d5.text((100, 140), "부부 20% 감액 방어 및 국민연금 연계 감액 회피 꿀팁", font=font_h1, fill=(255, 255, 255))

    strategies = [
        ("전략 1. 국민연금 연계 감액 기준선(월 60만원) 사수", "국민연금 수령액이 기초연금 기준액의 150%(약 60만원)를 초과하지 않도록 수령 시기 조율"),
        ("전략 2. 부부간 국민연금 분할 및 수령 시점 분산", "부부 중 한 명이 연기연금을 활용하여 동시 감액 구간을 우회하거나 분할 수령 활용"),
        ("전략 3. 근로소득 공제 116만원 최대한 활용", "사업소득 대신 근로소득 형태로 급여를 수령하여 기본 116만원 공제 + 30% 추가 공제 혜택 극대화")
    ]
    for i, (title, desc) in enumerate(strategies):
        d5.rounded_rectangle([100, 250 + i*180, 1820, 250 + (i+1)*180 - 20], radius=16, fill=(40, 30, 20), outline=(245, 158, 11), width=2)
        d5.text((140, 280 + i*180), f"🛡️ {title}", font=font_card_title, fill=(251, 191, 36))
        d5.text((140, 350 + i*180), desc, font=font_body, fill=(254, 243, 199))

    d5.text((100, 880), "💡 머니통 공식 웹사이트(moneytong.com)에서 1:1 맞춤형 연금 포트폴리오를 점검해 보세요!", font=font_chap, fill=(255, 215, 0))
    c5.save(f"{OUT_DIR}/chapters/ch5_defense_strategy.jpg", quality=95)

    print("5 Longform Chapter Frames generated.")

if __name__ == '__main__':
    create_flashcard_1()
    create_flashcard_2()
    create_flashcard_3()
    create_flashcard_4()
    create_longform_chapters()
