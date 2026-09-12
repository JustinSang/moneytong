import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

img_path = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch1_comparison_infographic_1787479555594.jpg"
img_bgr = cv2.imread(img_path)
h, w, _ = img_bgr.shape # 768, 1376

mask = np.zeros((h, w), dtype=np.uint8)

# Inpaint entire bounding boxes of old text areas so NO old fragments remain
# 1. Right bottom text area: x: [840, 1100], y: [550, 700]
mask[550:700, 840:1100] = 255

# 2. Right middle text area: x: [1060, 1355], y: [360, 550]
mask[360:550, 1060:1355] = 255

# 3. Left under scale: x: [450, 640], y: [220, 325]
mask[220:325, 450:640] = 255

# 4. Left bottom text area: x: [270, 530], y: [615, 720]
mask[615:720, 270:530] = 255

# 5. Left paper table contents (erase messy numbers): x: [35, 175], y: [415, 595]
mask[415:595, 35:175] = 255

# Inpaint using Navier-Stokes method for ultra-smooth gradient blending
inpainted = cv2.inpaint(img_bgr, mask, 7, cv2.INPAINT_NS)

# Convert to PIL Image for rendering typography
img_pil = Image.fromarray(cv2.cvtColor(inpainted, cv2.COLOR_BGR2RGB))
draw = ImageDraw.Draw(img_pil)

FONT_PATH = "/System/Library/Fonts/AppleSDGothicNeo.ttc"

def font(size, bold=True):
    return ImageFont.truetype(FONT_PATH, size, index=1 if bold else 0)

TEXT_COLOR = (45, 35, 35)

# 1. Right Bottom text (clean doodle style directly on seamless background)
draw.text((970, 580), "만 65세 이상 어르신", font=font(23, True), fill=TEXT_COLOR, anchor="mm")
draw.text((970, 616), "소득 하위 70% 대상", font=font(23, True), fill=TEXT_COLOR, anchor="mm")
draw.text((970, 652), "100% 정부 세금 지원 혜택!", font=font(22, True), fill=(225, 29, 72), anchor="mm")

# 2. Right Middle text & details (clean on seamless background)
draw.text((1205, 390), "65세 이상 어르신 대상", font=font(23, True), fill=TEXT_COLOR, anchor="mm")
draw.text((1205, 425), "100% 정부 세금 지원", font=font(23, True), fill=TEXT_COLOR, anchor="mm")
draw.text((1205, 470), "단독 월 최대 34.9만원", font=font(21, True), fill=(217, 119, 6), anchor="mm")
draw.text((1205, 502), "부부 월 최대 56.0만원", font=font(21, True), fill=(217, 119, 6), anchor="mm")

# 3. Left Under Scale (clean text directly on background)
draw.text((545, 255), "본인 4.5% + 회사 4.5%", font=font(21, True), fill=TEXT_COLOR, anchor="mm")
draw.text((545, 290), "(총 9% 매달 성실 적립)", font=font(19, False), fill=(80, 80, 80), anchor="mm")

# 4. Left Bottom text (clean on seamless background)
draw.text((400, 645), "10년 이상 성실 납부 시", font=font(23, True), fill=TEXT_COLOR, anchor="mm")
draw.text((400, 680), "평생 물가연동 연금 지급!", font=font(23, True), fill=(2, 132, 199), anchor="mm")

# 5. Left Paper Table (clean bullet text on white paper)
draw.text((105, 440), "• 최소 10년 납부", font=font(18, True), fill=(60, 60, 60), anchor="mm")
draw.text((105, 475), "• 소득비례 적립", font=font(18, True), fill=(60, 60, 60), anchor="mm")
draw.text((105, 510), "• 물가 100% 반영", font=font(18, True), fill=(60, 60, 60), anchor="mm")
draw.text((105, 545), "• 평생 보장 지급", font=font(19, True), fill=(220, 38, 38), anchor="mm")

out_file = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch1_seamless_master.jpg"
img_pil.save(out_file, quality=98)
img_pil.save("/Users/justinsm1max/.gemini/antigravity/brain/42dac325-b75f-4607-8823-1a9e5a734931/ch1_seamless_master.jpg", quality=98)
print("Seamless master Ch1 regenerated successfully:", out_file)
