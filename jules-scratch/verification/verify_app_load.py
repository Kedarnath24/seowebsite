from playwright.sync_api import Page, expect, sync_playwright

def verify_empty_dashboard(page: Page):
    """
    This test verifies that the empty dashboard state is displayed correctly.
    """
    # 1. Arrange: Go to the application's root page.
    page.goto("http://localhost:5173/", timeout=60000)

    # 2. Assert: Check for the "No analyses yet" heading to confirm the empty state is rendered.
    heading = page.get_by_role("heading", name="No analyses yet")
    expect(heading).to_be_visible()

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        verify_empty_dashboard(page)
        browser.close()

if __name__ == "__main__":
    run()