from playwright.sync_api import sync_playwright
import os
here = os.path.dirname(os.path.abspath(__file__))
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page(viewport={"width":1640,"height":624}, device_scale_factor=1)
    pg.goto(f"file://{here}/cover.html")
    pg.wait_for_timeout(400)
    pg.locator("#cover").screenshot(path=f"{here}/moneytong-cover.png")
    b.close()
print("saved moneytong-cover.png")
