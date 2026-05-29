const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Users\\Ren\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('file:///E:/Desktop/claude/pest-report-pro/index.html');
  await page.waitForTimeout(2000);
  // Navigate to Service Report
  await page.click('text=Service Report');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'E:/Desktop/claude/pest-report-pro/service-report-ui.png', fullPage: true });
  await browser.close();
  console.log('Screenshot saved to service-report-ui.png');
})();
