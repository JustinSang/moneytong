from playwright.sync_api import sync_playwright
import os
here = os.path.dirname(os.path.abspath(__file__))
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page(viewport={"width":512,"height":512}, device_scale_factor=2)
    pg.goto(f"file://{here}/profile.html")
    pg.wait_for_timeout(400)
    pg.locator("#box").screenshot(path=f"{here}/moneytong-profile.png")
    b.close()
print("saved moneytong-profile.png")
