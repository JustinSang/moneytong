import os
import glob
from playwright.sync_api import sync_playwright

OUT_DIR = os.path.join(os.path.dirname(__file__), 'output')

def main():
    html_files = glob.glob(os.path.join(OUT_DIR, '*.cards.html'))
    print(f"발견된 HTML 카드뉴스 파일: {len(html_files)}개")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Instagram size 1080x1350 (2.5x of 432x540)
        page = browser.new_page(device_scale_factor=2.5)
        
        for html_file in html_files:
            slug = os.path.basename(html_file).replace('.cards.html', '')
            print(f"[{slug}] 렌더링 중...")
            page.goto(f"file://{html_file}")
            
            # Wait a bit for fonts to load
            page.wait_for_timeout(500)
            
            cards = page.locator('.card').all()
            for i, card in enumerate(cards):
                out_path = os.path.join(OUT_DIR, f"{slug}-card-{i+1}.png")
                card.screenshot(path=out_path)
            print(f"  -> {len(cards)}장 렌더링 완료")
        
        browser.close()
    
    print("모든 PNG 렌더링 완료!")

if __name__ == "__main__":
    main()
