import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# Load image
img_path = "/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch1_comparison_infographic_1787479555594.jpg"
img_bgr = cv2.imread(img_path)
h, w, _ = img_bgr.shape # 768, 1376

# Create mask for text areas to inpaint
mask = np.zeros((h, w), dtype=np.uint8)

# Define regions of broken text to inpaint
# 1. Right bottom text: "대상 인1?수..."
# Box approx: x: [880, 1150], y: [580, 680]
# 2. Right middle text: "65+ 소년 대상상"
# Box approx: x: [1080, 1330], y: [380, 420]
# 3. Left under scale: "월전 7여 및..."
# Box approx: x: [460, 640], y: [240, 310]
# 4. Left bottom: "월월 가입 기여록..."
# Box approx: x: [320, 520], y: [630, 710]

# For each region, find dark text pixels on light background
def mask_text_in_roi(roi_box):
    x1, y1, x2, y2 = roi_box
    roi = img_bgr[y1:y2, x1:x2]
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    # Background is bright (>180), text is dark (<140)
    # Threshold for dark text
    text_mask = (gray < 155).astype(np.uint8) * 255
    # Dilate slightly to cover font anti-aliasing
    kernel = np.ones((3, 3), np.uint8)
    text_mask = cv2.dilate(text_mask, kernel, iterations=2)
    mask[y1:y2, x1:x2] = np.maximum(mask[y1:y2, x1:x2], text_mask)

# Apply to the 4 text regions
mask_text_in_roi((850, 580, 1160, 685))
mask_text_in_roi((1060, 370, 1340, 425))
mask_text_in_roi((460, 240, 640, 320))
mask_text_in_roi((300, 630, 530, 715))

# Inpaint using Telea method
inpainted = cv2.inpaint(img_bgr, mask, 5, cv2.INPAINT_TELEA)

# Save intermediate inpainted image
cv2.imwrite("/Users/justinsm1max/Desktop/unible_harness/moneytong/public/images/infographics/ch1_inpainted.jpg", inpainted)
print("Inpainting complete, mask applied.")
