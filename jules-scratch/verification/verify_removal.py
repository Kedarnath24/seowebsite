from playwright.sync_api import sync_playwright, expect
import time

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Add a delay to allow servers to start
            time.sleep(15)

            # 1. Navigate to the dashboard
            page.goto("http://localhost:5173/dashboard", timeout=90000)

            # Wait for page to load, specifically the URL analyzer input
            url_input = page.locator('[data-testid="input-url"]')
            expect(url_input).to_be_visible(timeout=60000)

            # 2. Fill in a valid URL
            url_input.fill("https://www.google.com")

            # 3. Click the analyze button
            analyze_button = page.locator('[data-testid="button-analyze"]')
            analyze_button.click()

            # 4. Wait for the "Analysis Complete" toast to appear.
            # This indicates the async operation is done.
            expect(page.get_by_text("Analysis Complete")).to_be_visible(timeout=60000)

            # 5. Take a screenshot
            page.screenshot(path="jules-scratch/verification/verification.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()