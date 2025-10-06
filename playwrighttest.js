const { test, expect } = require('@playwright/test');
test('Verify page title and content', async({ page })=>{
    await page.goto('https://example.com');
    console.log('navigated to example.com');
    await expect(page).toHaveTitle('Example Domain');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).tohaveText('Example domain');
});

test('Take a screenshot of the main page' , async({ page })=>{
    await page.goto('https://playwright.dev/');
    await page.screeshot({ path: 'test-results/playwright-homepage.png', fullpage: true });
    console.log('Screenshot saved to test-results/playwright-homepage.png');
    await expect(page).toHaveURL(/.*playwright.dev/);
})