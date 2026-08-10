import time
from playwright.sync_api import sync_playwright

def run_test():
    """
    Automated E2E test script generated from Chrome DevTools Recording.
    Target URL: http://34.207.100.138/#
    """
    with sync_playwright() as p:
        # Launch Chrome browser in headless mode for background execution
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 966, "height": 695},
            device_scale_factor=1,
            is_mobile=False,
            has_touch=False
        )
        page = context.new_page()

        print("1. Navigating to http://34.207.100.138/#...")
        page.goto("http://34.207.100.138/#")

        print("2. Clicking search input...")
        search_input = page.locator("#searchInput")
        search_input.click()

        print("3. Typing 'apple' into search input...")
        search_input.fill("apple")
        page.wait_for_timeout(500)

        print("4. Selecting first search suggestion...")
        suggestion = page.locator("#suggestionsList > div:nth-of-type(1) > div > div:nth-of-type(1)")
        suggestion.wait_for(state="visible", timeout=5000)
        suggestion.click()
        page.wait_for_timeout(500)

        print("5. Clicking product item...")
        product_img = page.locator("div.fk-card-img-wrap > img").first
        product_img.click()
        page.wait_for_timeout(500)

        print("6. Clicking BUY NOW...")
        buy_now_btn = page.locator("#productDetailModal button.fk-btn-orange")
        buy_now_btn.wait_for(state="visible", timeout=5000)
        buy_now_btn.click()
        page.wait_for_timeout(500)

        print("7. Selecting checkout options...")
        opt1 = page.locator("#checkoutModal div:nth-of-type(2) > div:nth-of-type(2)")
        opt1.click()
        page.wait_for_timeout(300)
        
        opt2 = page.locator("#checkoutModal div:nth-of-type(2) > div:nth-of-type(3)")
        opt2.click()
        page.wait_for_timeout(300)

        print("8. Clicking CONFIRM & PAY...")
        confirm_btn = page.locator("#checkoutContent button")
        confirm_btn.click()
        page.wait_for_timeout(500)

        print("9. Clicking View My Orders...")
        view_orders_btn = page.locator("#successModal button:nth-of-type(1)")
        view_orders_btn.wait_for(state="visible", timeout=5000)
        view_orders_btn.click()
        page.wait_for_timeout(500)

        print("10. Closing orders modal...")
        close_orders_btn = page.locator("#ordersModal button")
        close_orders_btn.wait_for(state="visible", timeout=5000)
        close_orders_btn.click()
        page.wait_for_timeout(1000)

        print("\n✅ All test steps completed successfully!")
        browser.close()

if __name__ == "__main__":
    run_test()
