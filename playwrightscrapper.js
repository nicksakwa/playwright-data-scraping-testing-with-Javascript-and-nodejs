// scraper.js - A basic Playwright script for data scraping
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true }); // Headless mode for efficiency
  const page = await browser.newPage();

  // 1. Navigate to a dynamic page
  await page.goto('https://toscrape.com/scroll/'); 
  
  // 2. Scroll down to trigger dynamic loading (example of a user action)
  await page.mouse.wheel(0, 5000); // Scroll down 5000 pixels

  // 3. Wait for the new, dynamically loaded data to appear (Playwright's auto-wait helps here)
  await page.waitForSelector('.post-card'); 

  // 4. Extract data using 'page.$$eval()' to run a function in the browser
  const posts = await page.$$eval('.post-card', allPosts => {
    return allPosts.map(post => {
      // Logic runs in the browser context
      const title = post.querySelector('.post-card__title a').textContent.trim();
      const author = post.querySelector('.post-card__author-name').textContent.trim();
      
      return { title, author };
    });
  });

  console.log('--- Scraped Data ---');
  console.log(posts);

  await browser.close();
})();